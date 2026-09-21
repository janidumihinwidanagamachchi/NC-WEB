import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://nalandacollege.lk'
const LOCALES = ['en', 'si']

const PATHS = [
  '/',
  '/about',
  '/history',
  '/about/principals',
  '/academics',
  '/news',
  '/events',
  '/gallery',
  '/sports',
  '/extracurricular',
  '/alumni',
  '/admissions',
  '/contact',
  '/search',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    for (const path of PATHS) {
      entries.push({
        url: `${BASE}/${locale}${path}/`,
        lastModified: new Date(),
        changeFrequency: path === '/' ? 'daily' : 'weekly',
        priority: path === '/' ? 1 : 0.7,
      })
    }
  }

  return entries
}
