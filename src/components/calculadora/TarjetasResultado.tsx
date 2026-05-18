'use client'
import { Target, Clock, Euro, Shield, TrendingUp, Anchor } from 'lucide-react'
import { formatEUR, formatPct } from '@/lib/utils'
import type { ResultadoFIRE } from '@/types'

function TarjetaHero({ resultado }: { resultado: ResultadoFIRE }) {
  return (
    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-1">
        <Target className="w-5 h-5 text-emerald-100" />
        <span className="text-emerald-100 text-sm font-medium">Tu Número FIRE</span>
      </div>
      <p className="text-4xl font-bold tracking-tight">
        {formatEUR(resultado.numeroFIRE)}
      </p>
      <p className="text-emerald-100 text-sm mt-1">
        Tasa de retirada: {(resultado.swrUsada * 100).toFixed(1)}% · Retiro bruto:{' '}
        {formatEUR(resultado.retiroBrutoAnual)}/año
      </p>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  sub,
  color = 'emerald',
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  color?: 'emerald' | 'blue' | 'amber' | 'red'
}) {
  const colors = {
    emerald: 'text-emerald-600 bg-emerald-50',
    blue: 'text-blue-600 bg-blue-50',
    amber: 'text-amber-600 bg-amber-50',
    red: 'text-red-600 bg-red-50',
  }
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${colors[color]} mb-3`}>
        {icon}
      </div>
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  )
}

function BarraProgreso({ pct }: { pct: number }) {
  const style =
    pct >= 0.9
      ? { bg: 'bg-emerald-500', text: 'text-emerald-600', label: 'Excelente' }
      : pct >= 0.7
        ? { bg: 'bg-blue-500', text: 'text-blue-600', label: 'Buena' }
        : pct >= 0.5
          ? { bg: 'bg-amber-500', text: 'text-amber-600', label: 'Aceptable' }
          : { bg: 'bg-red-500', text: 'text-red-600', label: 'Arriesgado' }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 text-purple-600">
          <Shield className="w-4 h-4" />
        </div>
        <p className="text-xs font-medium text-gray-500">Probabilidad de éxito (Monte Carlo)</p>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <p className="text-2xl font-bold text-gray-900">{Math.round(pct * 100)}%</p>
        <span className={`text-xs font-semibold ${style.text}`}>{style.label}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-700 ${style.bg}`}
          style={{ width: `${Math.round(pct * 100)}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1.5">Simulación con 800 escenarios de mercado</p>
    </div>
  )
}

function DesgloseFiscal({ resultado }: { resultado: ResultadoFIRE }) {
  const { retiroBrutoAnual, retiroNetoAnual, irpfAnual, tasaEfectivaIRPF, pensionAnual } = resultado

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <Euro className="w-4 h-4 text-gray-400" />
        Desglose fiscal en retiro
      </h3>
      <div className="space-y-2 text-sm">
        {pensionAnual > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-500">Pensión anual (base general)</span>
            <span className="font-medium">{formatEUR(pensionAnual)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-500">Retiro portafolio (base ahorro)</span>
          <span className="font-medium">{formatEUR(retiroBrutoAnual)}</span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>IRPF estimado</span>
          <span className="font-medium">−{formatEUR(irpfAnual)}</span>
        </div>
        <div className="border-t border-gray-100 pt-2 flex justify-between font-semibold">
          <span>Renta neta disponible</span>
          <span className="text-emerald-700">{formatEUR(retiroNetoAnual)}</span>
        </div>
        <p className="text-xs text-gray-400 pt-1">
          Tipo efectivo IRPF: {formatPct(tasaEfectivaIRPF)} · Tramos base ahorro 2024/25
        </p>
      </div>
    </div>
  )
}

export function TarjetasResultado({ resultado }: { resultado: ResultadoFIRE }) {
  const { anosHastaFIRE, edadFIREReal, retiroNetoAnual, tasaEfectivaIRPF, coastFIRENumber } =
    resultado

  const fireAlcanzado = anosHastaFIRE !== null

  return (
    <div className="space-y-4">
      <TarjetaHero resultado={resultado} />

      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          icon={<Clock className="w-4 h-4" />}
          label="Años hasta FIRE"
          value={fireAlcanzado ? `${anosHastaFIRE} años` : 'No alcanzado'}
          sub={fireAlcanzado ? `A los ${edadFIREReal} años` : 'Aumenta el ahorro'}
          color={fireAlcanzado ? 'emerald' : 'red'}
        />
        <MetricCard
          icon={<TrendingUp className="w-4 h-4" />}
          label="Renta neta en retiro"
          value={formatEUR(retiroNetoAnual / 12) + '/mes'}
          sub={formatEUR(retiroNetoAnual) + '/año'}
          color="blue"
        />
      </div>

      <MetricCard
        icon={<Euro className="w-4 h-4" />}
        label="IRPF efectivo en retiro"
        value={formatPct(tasaEfectivaIRPF)}
        sub="Solo sobre el retiro del portafolio (base ahorro)"
        color="amber"
      />

      {coastFIRENumber !== null && (
        <MetricCard
          icon={<Anchor className="w-4 h-4" />}
          label="Coast FIRE (para dejar de ahorrar hoy)"
          value={formatEUR(coastFIRENumber)}
          sub="Si tienes esta cantidad invertida ya, puedes parar de ahorrar"
          color="blue"
        />
      )}

      <BarraProgreso pct={resultado.probabilidadExito} />
      <DesgloseFiscal resultado={resultado} />
    </div>
  )
}
