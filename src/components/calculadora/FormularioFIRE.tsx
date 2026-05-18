'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Flame, TrendingUp, Info } from 'lucide-react'
import type { DatosFIRE, TipoFIRE } from '@/types'

// Use z.number() (not z.coerce) + valueAsNumber in register — Zod v4 compatible
const schema = z.object({
  edadActual: z.number().int().min(18, 'Mín. 18').max(80, 'Máx. 80'),
  edadFIRE: z.number().int().min(25, 'Mín. 25').max(90, 'Máx. 90'),
  patrimonioActual: z.number().min(0, 'Debe ser positivo'),
  ahorroMensual: z.number().min(0, 'Debe ser positivo'),
  gastosMensualesRetiro: z.number().min(100, 'Mínimo 100€/mes'),
  rentabilidadEsperada: z.number().min(0.1, 'Mín. 0.1%').max(30, 'Máx. 30%'),
  inflacionEsperada: z.number().min(0, 'Mín. 0%').max(20, 'Máx. 20%'),
  tipoFIRE: z.enum(['traditional', 'lean', 'fat', 'coast'] as const),
  incluyePension: z.boolean(),
  pensionMensual: z.number().min(0, 'Debe ser positivo'),
}).refine(d => d.edadFIRE > d.edadActual, {
  message: 'Debe ser mayor que la edad actual',
  path: ['edadFIRE'],
})

type FormValues = z.infer<typeof schema>

const DEFAULTS: FormValues = {
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

const TIPOS_FIRE: { value: TipoFIRE; label: string; desc: string }[] = [
  { value: 'traditional', label: 'Traditional FIRE', desc: 'Regla del 4% — 25x gastos' },
  { value: 'lean', label: 'Lean FIRE', desc: 'Gastos mínimos — retiro 3.5%' },
  { value: 'fat', label: 'Fat FIRE', desc: 'Estilo elevado — retiro 3.5%' },
  { value: 'coast', label: 'Coast FIRE', desc: 'Ahorra fuerte ahora, para después' },
]

interface Props {
  onCalcular: (datos: DatosFIRE) => void
  calculando: boolean
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {hint && <span className="ml-1 text-gray-400 text-xs font-normal">({hint})</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider pb-2 border-b border-gray-100">
      {title}
    </h3>
  )
}

const inputClass =
  'block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors'

const numProps = { valueAsNumber: true } as const

export function FormularioFIRE({ onCalcular, calculando }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: DEFAULTS,
  })

  const incluyePension = watch('incluyePension')

  const onSubmit = handleSubmit((data) => {
    onCalcular(data as unknown as DatosFIRE)
  })

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-md p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Flame className="w-5 h-5 text-emerald-600" />
        <h2 className="text-lg font-bold text-gray-900">Tus datos</h2>
      </div>

      {/* Datos personales */}
      <div className="space-y-4">
        <SectionHeader title="Datos personales" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Edad actual" error={errors.edadActual?.message}>
            <input
              type="number"
              {...register('edadActual', numProps)}
              className={inputClass}
              placeholder="30"
            />
          </Field>
          <Field label="Edad objetivo FIRE" error={errors.edadFIRE?.message}>
            <input
              type="number"
              {...register('edadFIRE', numProps)}
              className={inputClass}
              placeholder="45"
            />
          </Field>
        </div>
      </div>

      {/* Situación financiera */}
      <div className="space-y-4">
        <SectionHeader title="Situación financiera" />
        <Field label="Patrimonio actual" hint="€" error={errors.patrimonioActual?.message}>
          <input
            type="number"
            {...register('patrimonioActual', numProps)}
            className={inputClass}
            placeholder="50000"
          />
        </Field>
        <Field label="Ahorro mensual" hint="€/mes" error={errors.ahorroMensual?.message}>
          <input
            type="number"
            {...register('ahorroMensual', numProps)}
            className={inputClass}
            placeholder="1500"
          />
        </Field>
        <Field
          label="Gastos mensuales en retiro"
          hint="€/mes"
          error={errors.gastosMensualesRetiro?.message}
        >
          <input
            type="number"
            {...register('gastosMensualesRetiro', numProps)}
            className={inputClass}
            placeholder="2000"
          />
        </Field>
      </div>

      {/* Proyección */}
      <div className="space-y-4">
        <SectionHeader title="Parámetros de proyección" />
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Rentabilidad esperada"
            hint="%/año"
            error={errors.rentabilidadEsperada?.message}
          >
            <input
              type="number"
              step="0.5"
              {...register('rentabilidadEsperada', numProps)}
              className={inputClass}
              placeholder="7"
            />
          </Field>
          <Field
            label="Inflación esperada"
            hint="%/año"
            error={errors.inflacionEsperada?.message}
          >
            <input
              type="number"
              step="0.5"
              {...register('inflacionEsperada', numProps)}
              className={inputClass}
              placeholder="2.5"
            />
          </Field>
        </div>

        <Field label="Tipo FIRE" error={errors.tipoFIRE?.message}>
          <select {...register('tipoFIRE')} className={inputClass}>
            {TIPOS_FIRE.map(t => (
              <option key={t.value} value={t.value}>
                {t.label} — {t.desc}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Pensión */}
      <div className="space-y-4">
        <SectionHeader title="Pensión pública española" />
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('incluyePension')}
            className="w-4 h-4 rounded accent-emerald-600"
          />
          <span className="text-sm text-gray-700">Incluir pensión pública estimada</span>
        </label>

        {incluyePension && (
          <Field
            label="Pensión mensual estimada"
            hint="€/mes"
            error={errors.pensionMensual?.message}
          >
            <input
              type="number"
              {...register('pensionMensual', numProps)}
              className={inputClass}
              placeholder="800"
            />
          </Field>
        )}

        <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            La pensión reduce el retiro necesario del portafolio y baja el número FIRE.
            Consulta tu estimación en <strong>sede.seg-social.gob.es</strong>.
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={calculando}
        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
      >
        <TrendingUp className="w-5 h-5" />
        {calculando ? 'Calculando...' : 'Calcular mi FIRE'}
      </button>
    </form>
  )
}
