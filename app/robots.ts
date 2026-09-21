import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://nalandacollege.lk'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
