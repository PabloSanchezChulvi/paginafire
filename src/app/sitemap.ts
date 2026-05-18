import { MetadataRoute } from 'next'

// Cambia por tu dominio real cuando lo registres
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://firecalculadora.es'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}
