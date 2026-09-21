import { getTranslations } from 'next-intl/server'
import { Hero } from '@/components/home/Hero'
import { QuickTiles } from '@/components/home/QuickTiles'
import { Pillars } from '@/components/home/Pillars'
import { CtaStrip } from '@/components/home/CtaStrip'
import { StatsBand } from '@/components/home/StatsBand'
import { PrincipalsBanner } from '@/components/home/PrincipalsBanner'
import { NewsStrip } from '@/components/home/NewsStrip'
import { EventsStrip } from '@/components/home/EventsStrip'
import { CalloutSection } from '@/components/home/CalloutSection'
import { sanityFetch } from '@/lib/sanity/client'
import { latestNewsQuery, upcomingEventsQuery, siteSettingsQuery } from '@/lib/sanity/queries'
import type { NewsArticle, Event, SiteSettings } from '@/types/sanity'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  await params
  const [articles, events, settings] = await Promise.all([
    sanityFetch<NewsArticle[]>({ query: latestNewsQuery, tags: ['newsArticle'] }),
    sanityFetch<Event[]>({ query: upcomingEventsQuery, tags: ['event'] }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery, tags: ['siteSettings'] }),
  ])

  return (
    <>
      <Hero />
      <QuickTiles />
      <Pillars />
      <CtaStrip />
      <StatsBand />
      <PrincipalsBanner />
      <NewsStrip articles={articles} />
      <EventsStrip events={events} />
      <CalloutSection settings={settings} />
    </>
  )
}
