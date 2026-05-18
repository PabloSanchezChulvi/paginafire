export type TipoFIRE = 'traditional' | 'lean' | 'fat' | 'coast'

export interface DatosFIRE {
  edadActual: number
  edadFIRE: number
  patrimonioActual: number
  ahorroMensual: number
  gastosMensualesRetiro: number
  rentabilidadEsperada: number
  inflacionEsperada: number
  tipoFIRE: TipoFIRE
  incluyePension: boolean
  pensionMensual: number
}

export interface PuntoProyeccion {
  edad: number
  esperado: number
  optimista: number
  pesimista: number
  objetivoFIRE: number
}

export interface ResultadoFIRE {
  numeroFIRE: number
  anosHastaFIRE: number | null
  edadFIREReal: number | null
  retiroBrutoAnual: number
  retiroNetoAnual: number
  irpfAnual: number
  tasaEfectivaIRPF: number
  proyeccion: PuntoProyeccion[]
  probabilidadExito: number
  swrUsada: number
  patrimonioEnFIRE: number
  coastFIRENumber: number | null
  pensionAnual: number
}
