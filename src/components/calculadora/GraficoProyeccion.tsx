'use client'
import { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import { formatK, formatEUR } from '@/lib/utils'
import type { PuntoProyeccion } from '@/types'

interface Props {
  proyeccion: PuntoProyeccion[]
  numeroFIRE: number
  edadFIRE: number | null
}

interface TooltipEntry {
  name?: string
  value?: number
  color?: string
}

interface TooltipData {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string | number
}

function CustomTooltip({ active, payload, label }: TooltipData) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-sm">
      <p className="font-semibold text-gray-800 mb-2">Edad: {label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="flex justify-between gap-4">
          <span>{entry.name}</span>
          <span className="font-medium">{formatEUR(entry.value ?? 0)}</span>
        </p>
      ))}
    </div>
  )
}

export function GraficoProyeccion({ proyeccion, numeroFIRE, edadFIRE }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="h-72 animate-pulse bg-gray-100 rounded-lg" />
      </div>
    )
  }

  // Sample data to max 60 points for performance
  const step = Math.ceil(proyeccion.length / 60)
  const data = proyeccion.filter((_, i) => i % step === 0)

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Proyección patrimonial (euros constantes)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="gradOpt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradEsp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradPes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

          <XAxis
            dataKey="edad"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
            label={{ value: 'Edad', position: 'insideBottomRight', offset: -5, fontSize: 11, fill: '#94a3b8' }}
          />
          <YAxis
            tickFormatter={formatK}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            width={55}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
          />

          <Area
            type="monotone"
            dataKey="optimista"
            name="Optimista"
            stroke="#3b82f6"
            strokeWidth={1.5}
            fill="url(#gradOpt)"
            strokeDasharray="4 2"
          />
          <Area
            type="monotone"
            dataKey="esperado"
            name="Esperado"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#gradEsp)"
          />
          <Area
            type="monotone"
            dataKey="pesimista"
            name="Pesimista"
            stroke="#f97316"
            strokeWidth={1.5}
            fill="url(#gradPes)"
            strokeDasharray="4 2"
          />

          <ReferenceLine
            y={numeroFIRE}
            stroke="#ef4444"
            strokeDasharray="6 3"
            strokeWidth={1.5}
            label={{
              value: `FIRE: ${formatK(numeroFIRE)}`,
              fill: '#ef4444',
              fontSize: 10,
              position: 'insideTopRight',
            }}
          />

          {edadFIRE !== null && (
            <ReferenceLine
              x={edadFIRE}
              stroke="#8b5cf6"
              strokeDasharray="6 3"
              strokeWidth={1.5}
              label={{
                value: `${edadFIRE}a`,
                fill: '#8b5cf6',
                fontSize: 10,
                position: 'insideTopLeft',
              }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 mt-2 text-center">
        Retorno real ajustado por inflación · Rojo = objetivo FIRE · Morado = edad FIRE
      </p>
    </div>
  )
}
