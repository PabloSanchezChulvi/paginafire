import { CalculadoraFIRE } from '@/components/calculadora/CalculadoraFIRE'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fuegocalculadora.com'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculadora FIRE España',
  url: SITE_URL,
  description:
    'Calcula tu número FIRE con IRPF 2024/25 real. La calculadora de independencia financiera más completa para residentes en España.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  inLanguage: 'es-ES',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  featureList: [
    'Cálculo del número FIRE',
    'IRPF 2024/25 con tramos base ahorro',
    'Simulación Monte Carlo',
    'Coast FIRE',
    'Proyección patrimonial',
    'Pensión pública española',
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculadoraFIRE />
    </>
  )
}
