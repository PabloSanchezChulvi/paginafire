'use client'
import { useState, useEffect } from 'react'
import { FormularioFIRE } from './FormularioFIRE'
import { TarjetasResultado } from './TarjetasResultado'
import { GraficoProyeccion } from './GraficoProyeccion'
import { SeccionAfiliados } from '@/components/afiliados/SeccionAfiliados'
import { NewsletterCTA } from '@/components/newsletter/NewsletterCTA'
import { AdSenseSlot } from '@/components/ads/AdSenseSlot'
import { proyectarPatrimonio } from '@/lib/fire'
import type { DatosFIRE, ResultadoFIRE } from '@/types'
import Link from 'next/link'

const DEFAULTS: DatosFIRE = {
  edadActual: 30,
  edadFIRE: 45,
  patrimonioActual: 50000,
  ahorroMensual: 1500,
  gastosMensualesRetiro: 2000,
  rentabilidadEsperada: 7,
  inflacionEsperada: 2.5,
  tipoFIRE: 'traditional',
  incluyePension: true,
  pensionMensual: 800,
}

export function CalculadoraFIRE() {
  // null en SSR — cálculo solo en cliente para evitar mismatch con Math.random()
  const [resultado, setResultado] = useState<ResultadoFIRE | null>(null)
  const [calculando, setCalculando] = useState(false)

  useEffect(() => {
    setResultado(proyectarPatrimonio(DEFAULTS))
  }, [])

  const handleCalcular = (datos: DatosFIRE) => {
    setCalculando(true)
    setTimeout(() => {
      setResultado(proyectarPatrimonio(datos))
      setCalculando(false)
    }, 10)
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* Hero header */}
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              🔥 Calculadora FIRE para España
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">
              Planifica tu Independencia Financiera
            </h1>
            <p className="text-emerald-100 max-w-xl mx-auto text-base sm:text-lg">
              La única calculadora FIRE con IRPF real 2024/25, tramos de base ahorro
              y sistema de pensiones español.
            </p>
          </div>
        </div>

        {/* Calculator */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">
            {/* Left: form */}
            <div className="lg:sticky lg:top-6">
              <FormularioFIRE onCalcular={handleCalcular} calculando={calculando} />
            </div>

            {/* Right: results */}
            <div className="space-y-6">
              {resultado ? (
                <>
                  <TarjetasResultado resultado={resultado} />
                  <GraficoProyeccion
                    proyeccion={resultado.proyeccion}
                    numeroFIRE={resultado.numeroFIRE}
                    edadFIRE={resultado.edadFIREReal}
                  />
                  {/* AdSense slot dentro del panel de resultados */}
                  <AdSenseSlot slot="7654321098" format="rectangle" />
                </>
              ) : (
                <div className="space-y-4 animate-pulse">
                  <div className="h-32 bg-gray-200 rounded-2xl" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-gray-200 rounded-xl" />
                    <div className="h-24 bg-gray-200 rounded-xl" />
                  </div>
                  <div className="h-24 bg-gray-200 rounded-xl" />
                  <div className="h-24 bg-gray-200 rounded-xl" />
                  <div className="h-72 bg-gray-200 rounded-2xl" />
                </div>
              )}
            </div>
          </div>

          {/* Aviso legal */}
          <p className="text-center text-xs text-gray-400 mt-10 max-w-2xl mx-auto">
            Esta calculadora es orientativa y no constituye asesoramiento financiero.
            El IRPF usa tipos medios nacionales 2024/25. Los retornos históricos no garantizan resultados futuros.{' '}
            <Link href="/privacidad" className="underline hover:text-gray-500">
              Política de privacidad
            </Link>
          </p>
        </div>

        {/* AdSense banner entre calculadora y afiliados */}
        <div className="max-w-5xl mx-auto px-4 py-4">
          <AdSenseSlot slot="1234567890" format="horizontal" />
        </div>
      </div>

      {/* Sección afiliados — fuera del bg-slate-50 para contraste visual */}
      <SeccionAfiliados />

      {/* Newsletter CTA */}
      <NewsletterCTA />

      {/* Footer mínimo */}
      <footer className="bg-slate-900 text-slate-500 text-xs text-center py-6 px-4">
        <p>
          © {new Date().getFullYear()} Calculadora FIRE España ·{' '}
          <Link href="/privacidad" className="hover:text-slate-300 underline">
            Privacidad
          </Link>{' '}
          · Herramienta gratuita de orientación financiera ·{' '}
          No constituye asesoramiento financiero
        </p>
      </footer>
    </>
  )
}
