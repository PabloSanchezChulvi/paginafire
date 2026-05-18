import { calcularCuotaIRPF, calcularRetiroBrutoNecesario } from './irpf'
import type { DatosFIRE, ResultadoFIRE, PuntoProyeccion } from '@/types'

const SWR: Record<string, number> = {
  lean: 0.035,
  traditional: 0.04,
  fat: 0.035,
  coast: 0.04,
}

function gaussianRandom(): number {
  let u = 0, v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function monteCarlo(
  patrimonioInicial: number,
  ahorroAnual: number,
  anosAcumulacion: number,
  retiroBruto: number,
  retornoReal: number,
  simulaciones = 800,
  anosRetiro = 40
): number {
  const std = 0.12
  let exitos = 0
  for (let s = 0; s < simulaciones; s++) {
    let p = patrimonioInicial
    for (let a = 0; a < anosAcumulacion; a++) {
      p = p * (1 + retornoReal + gaussianRandom() * std) + ahorroAnual
    }
    let ok = true
    for (let a = 0; a < anosRetiro; a++) {
      p = p * (1 + retornoReal + gaussianRandom() * std) - retiroBruto
      if (p <= 0) { ok = false; break }
    }
    if (ok) exitos++
  }
  return exitos / simulaciones
}

export function proyectarPatrimonio(datos: DatosFIRE): ResultadoFIRE {
  const {
    edadActual,
    edadFIRE,
    patrimonioActual,
    ahorroMensual,
    gastosMensualesRetiro,
    rentabilidadEsperada,
    inflacionEsperada,
    tipoFIRE,
    incluyePension,
    pensionMensual,
  } = datos

  const pensionAnual = incluyePension ? pensionMensual * 12 : 0
  const ahorroAnual = ahorroMensual * 12
  const gastosAnualesRetiro = gastosMensualesRetiro * 12
  const swr = SWR[tipoFIRE] ?? 0.04
  const retornoReal = (rentabilidadEsperada - inflacionEsperada) / 100
  const retornoOpt = retornoReal + 0.02
  const retornoPes = Math.max(-0.02, retornoReal - 0.02)

  const retiroBruto = calcularRetiroBrutoNecesario(gastosAnualesRetiro, pensionAnual, edadFIRE)
  const numeroFIRE = retiroBruto / swr

  const anosHastaEdadFIRE = Math.max(0, edadFIRE - edadActual)

  // Coast FIRE: patrimonio necesario hoy para llegar al número FIRE sin más ahorros
  const coastFIRENumber =
    retornoReal > 0 && anosHastaEdadFIRE > 0
      ? numeroFIRE / Math.pow(1 + retornoReal, anosHastaEdadFIRE)
      : null

  const { cuotaTotal, tasaEfectiva } = calcularCuotaIRPF(pensionAnual, retiroBruto, edadFIRE)

  // Proyección patrimonial
  const proyeccion: PuntoProyeccion[] = []
  let pe = patrimonioActual
  let po = patrimonioActual
  let pp = patrimonioActual
  let anosParaFIRE: number | null = null

  const maxAnos = Math.max(anosHastaEdadFIRE + 35, 50)

  for (let ano = 0; ano <= maxAnos; ano++) {
    const edad = edadActual + ano
    const enRetiro = edad >= edadFIRE

    proyeccion.push({
      edad,
      esperado: Math.max(0, pe),
      optimista: Math.max(0, po),
      pesimista: Math.max(0, pp),
      objetivoFIRE: numeroFIRE,
    })

    if (anosParaFIRE === null && pe >= numeroFIRE) {
      anosParaFIRE = ano
    }

    if (!enRetiro) {
      pe = pe * (1 + retornoReal) + ahorroAnual
      po = po * (1 + retornoOpt) + ahorroAnual
      pp = pp * (1 + retornoPes) + ahorroAnual
    } else {
      pe = pe * (1 + retornoReal) - retiroBruto
      po = po * (1 + retornoOpt) - retiroBruto
      pp = pp * (1 + retornoPes) - retiroBruto
    }
  }

  const idxFIRE = anosParaFIRE ?? anosHastaEdadFIRE
  const patrimonioEnFIRE = proyeccion[Math.min(idxFIRE, proyeccion.length - 1)]?.esperado ?? 0

  const probabilidadExito = monteCarlo(
    patrimonioActual,
    ahorroAnual,
    anosHastaEdadFIRE,
    retiroBruto,
    retornoReal
  )

  return {
    numeroFIRE,
    anosHastaFIRE: anosParaFIRE,
    edadFIREReal: anosParaFIRE !== null ? edadActual + anosParaFIRE : null,
    retiroBrutoAnual: retiroBruto,
    retiroNetoAnual: gastosAnualesRetiro,
    irpfAnual: cuotaTotal,
    tasaEfectivaIRPF: tasaEfectiva,
    proyeccion,
    probabilidadExito,
    swrUsada: swr,
    patrimonioEnFIRE,
    coastFIRENumber,
    pensionAnual,
  }
}
