'use client'
import { ExternalLink, Star, Shield, TrendingUp, PiggyBank } from 'lucide-react'

interface Broker {
  id: string
  nombre: string
  subtitulo: string
  descripcion: string
  ventajas: string[]
  cta: string
  // Sustituye '#' por tu link de afiliado real
  href: string
  badge?: string
  accentColor: string
  iconBg: string
  icon: React.ReactNode
}

const BROKERS: Broker[] = [
  {
    id: 'indexa',
    nombre: 'Indexa Capital',
    subtitulo: 'Robo-advisor líder en España',
    descripcion: 'Gestión automatizada de cartera de fondos indexados. El favorito de la comunidad FIRE española por sus comisiones ultrabajas.',
    ventajas: [
      'Comisión total desde 0.41%/año',
      'Cartera indexada global automática',
      'Rebalanceo y optimización fiscal automáticos',
    ],
    cta: 'Abrir cuenta en Indexa',
    href: '#indexa-afiliado',
    badge: 'Más recomendado FIRE',
    accentColor: 'border-emerald-400',
    iconBg: 'bg-emerald-50 text-emerald-600',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: 'myinvestor',
    nombre: 'MyInvestor',
    subtitulo: 'Neobroker con fondos indexados',
    descripcion: 'Accede a fondos Amundi, Vanguard e iShares sin comisión de custodia. Los traspasos entre fondos son gratuitos y sin peaje fiscal.',
    ventajas: [
      '0€ comisión de custodia',
      'Fondos Vanguard y Amundi disponibles',
      'Traspasos sin tributar en IRPF',
    ],
    cta: 'Abrir cuenta en MyInvestor',
    href: '#myinvestor-afiliado',
    accentColor: 'border-blue-400',
    iconBg: 'bg-blue-50 text-blue-600',
    icon: <Star className="w-5 h-5" />,
  },
  {
    id: 'degiro',
    nombre: 'DEGIRO',
    subtitulo: 'Broker de bajo coste para ETFs',
    descripcion: 'Acceso a miles de ETFs en bolsas mundiales a comisiones mínimas. Ideal para construir una cartera FIRE con ETFs de acumulación.',
    ventajas: [
      'ETFs desde 0€ (fondos principales)',
      'Acceso a bolsas de 50+ países',
      'Ideal para ETFs de acumulación',
    ],
    cta: 'Abrir cuenta en DEGIRO',
    href: '#degiro-afiliado',
    accentColor: 'border-orange-400',
    iconBg: 'bg-orange-50 text-orange-600',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 'raisin',
    nombre: 'Raisin',
    subtitulo: 'Depósitos europeos al mejor tipo',
    descripcion: 'Para el colchón de seguridad y la parte conservadora de tu cartera FIRE. Acceso a los mejores depósitos bancarios de Europa.',
    ventajas: [
      'Hasta 3.5-4% TAE en depósitos',
      'Bancos europeos con garantía FGD (100K€)',
      'Sin comisiones de gestión',
    ],
    cta: 'Ver depósitos en Raisin',
    href: '#raisin-afiliado',
    accentColor: 'border-purple-400',
    iconBg: 'bg-purple-50 text-purple-600',
    icon: <PiggyBank className="w-5 h-5" />,
  },
]

export function SeccionAfiliados() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ¿Ya tienes tu número FIRE? Ahora invierte para alcanzarlo
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Herramientas usadas por la comunidad FIRE española para construir patrimonio con bajas comisiones
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BROKERS.map((broker) => (
          <a
            key={broker.id}
            href={broker.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`group relative flex flex-col bg-white rounded-2xl border-2 ${broker.accentColor} shadow-sm hover:shadow-md transition-all duration-200 p-5`}
          >
            {broker.badge && (
              <span className="absolute -top-3 left-4 bg-emerald-500 text-white text-xs font-semibold px-3 py-0.5 rounded-full">
                {broker.badge}
              </span>
            )}

            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${broker.iconBg} mb-3`}>
              {broker.icon}
            </div>

            <h3 className="font-bold text-gray-900 text-base">{broker.nombre}</h3>
            <p className="text-xs text-gray-500 mb-2">{broker.subtitulo}</p>
            <p className="text-sm text-gray-600 mb-3 flex-1">{broker.descripcion}</p>

            <ul className="space-y-1 mb-4">
              {broker.ventajas.map((v) => (
                <li key={v} className="flex items-start gap-1.5 text-xs text-gray-600">
                  <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                  {v}
                </li>
              ))}
            </ul>

            <span className="mt-auto flex items-center justify-center gap-1.5 bg-gray-900 group-hover:bg-emerald-600 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors">
              {broker.cta}
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        🔗 Los botones son enlaces de afiliado. Si abres cuenta a través de ellos no te supone ningún coste adicional,
        y nos ayuda a mantener esta calculadora gratuita.{' '}
        <a href="/privacidad" className="underline hover:text-gray-600">Política de privacidad</a>
      </p>
    </section>
  )
}
