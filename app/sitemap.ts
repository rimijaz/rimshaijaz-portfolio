import type { MetadataRoute } from 'next'
import { siteConfig } from '../data/siteConfig'

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteConfig.url || 'http://localhost:3000'

  return [
    {
      url: `${origin}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
