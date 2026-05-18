import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://firecalculadora.es'
// Sustituye por tu ID real de GA4 cuando lo tengas
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Calculadora FIRE España — Independencia Financiera con IRPF Real',
    template: '%s — Calculadora FIRE España',
  },
  description:
    'Calcula tu número FIRE con IRPF 2024/25 real, tramos de base ahorro y sistema de pensiones español. La calculadora de independencia financiera más completa de España.',
  keywords: [
    'calculadora FIRE España',
    'independencia financiera España',
    'número FIRE',
    'FIRE calculator',
    'jubilación anticipada España',
    'IRPF inversiones',
    'fondos indexados España',
    'retiro anticipado',
  ],
  authors: [{ name: 'Calculadora FIRE España' }],
  creator: 'Calculadora FIRE España',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    siteName: 'Calculadora FIRE España',
    title: 'Calculadora FIRE España — Independencia Financiera con IRPF Real',
    description:
      'La única calculadora FIRE con IRPF 2024/25 real para España. Calcula tu número FIRE, años hasta la independencia y carga fiscal en el retiro.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Calculadora FIRE España',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora FIRE España — Con IRPF Real',
    description: 'Calcula tu número FIRE con los impuestos reales de España.',
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3507033817568785"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics 4 — activa cuando tengas tu GA_ID */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
