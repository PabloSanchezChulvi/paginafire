interface Tramo {
  limite: number
  tipo: number
}

// IRPF 2024/2025 — escala estatal + autonómica media
const TRAMOS_GENERAL: Tramo[] = [
  { limite: 12450, tipo: 0.19 },
  { limite: 20200, tipo: 0.24 },
  { limite: 35200, tipo: 0.30 },
  { limite: 60000, tipo: 0.37 },
  { limite: 300000, tipo: 0.45 },
  { limite: Infinity, tipo: 0.47 },
]

// Base del ahorro (plusvalías, dividendos, intereses)
const TRAMOS_AHORRO: Tramo[] = [
  { limite: 6000, tipo: 0.19 },
  { limite: 50000, tipo: 0.21 },
  { limite: 200000, tipo: 0.23 },
  { limite: 300000, tipo: 0.27 },
  { limite: Infinity, tipo: 0.28 },
]

function cuotaTramos(base: number, tramos: Tramo[]): number {
  if (base <= 0) return 0
  let cuota = 0
  let prevLimite = 0
  for (const { limite, tipo } of tramos) {
    if (base <= prevLimite) break
    const enTramo = Math.min(base, limite) - prevLimite
    cuota += enTramo * tipo
    prevLimite = limite
  }
  return cuota
}

export function calcularCuotaIRPF(
  baseGeneral: number,
  baseAhorro: number,
  edad = 45
): { cuotaGeneral: number; cuotaAhorro: number; cuotaTotal: number; tasaEfectiva: number } {
  // Mínimo personal: reduce la cuota de la base general
  const minimoPersonal = edad >= 75 ? 8100 : edad >= 65 ? 6700 : 5550
  const cuotaGeneralBruta = cuotaTramos(Math.max(0, baseGeneral), TRAMOS_GENERAL)
  const reduccionMinimo = cuotaTramos(minimoPersonal, TRAMOS_GENERAL)
  const cuotaGeneral = Math.max(0, cuotaGeneralBruta - reduccionMinimo)
  const cuotaAhorro = cuotaTramos(Math.max(0, baseAhorro), TRAMOS_AHORRO)
  const cuotaTotal = cuotaGeneral + cuotaAhorro
  const baseTotal = Math.max(0, baseGeneral) + Math.max(0, baseAhorro)

  return {
    cuotaGeneral,
    cuotaAhorro,
    cuotaTotal,
    tasaEfectiva: baseTotal > 0 ? cuotaTotal / baseTotal : 0,
  }
}

// Búsqueda binaria: encuentra el retiro bruto del portafolio que produce gastoNetoTotal neto
// Pensión → base general; retiro portafolio → base ahorro
export function calcularRetiroBrutoNecesario(
  gastoNetoTotal: number,
  pensionAnual = 0,
  edad = 65
): number {
  if (gastoNetoTotal <= 0) return 0
  const gastoSinPension = gastoNetoTotal - pensionAnual
  if (gastoSinPension <= 0) return 0

  let low = gastoSinPension
  let high = gastoSinPension * 3

  for (let i = 0; i < 40; i++) {
    const mid = (low + high) / 2
    const { cuotaTotal } = calcularCuotaIRPF(pensionAnual, mid, edad)
    const neto = mid + pensionAnual - cuotaTotal
    if (neto < gastoNetoTotal) {
      low = mid
    } else {
      high = mid
    }
  }

  return (low + high) / 2
}
