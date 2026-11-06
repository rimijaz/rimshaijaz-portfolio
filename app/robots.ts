import type { MetadataRoute } from 'next'
import { siteConfig } from '../data/siteConfig'

export default function robots(): MetadataRoute.Robots {
  const origin = siteConfig.url || 'http://localhost:3000'

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${origin}/sitemap.xml`,
  }
}
