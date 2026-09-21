import { getTranslations } from 'next-intl/server'
import { HeroParallax } from '@/components/home/HeroParallax'
import { StatsBanner } from '@/components/home/StatsBanner'
import { NewsSection } from '@/components/home/NewsSection'
import { EventsSection } from '@/components/home/EventsSection'
import { HistoryTimeline } from '@/components/home/HistoryTimeline'
import { BattleOfMaroons } from '@/components/home/BattleOfMaroons'
import { AlumniSection } from '@/components/home/AlumniSection'
import { FacebookFeed } from '@/components/home/FacebookFeed'
import { AdmissionsCallout } from '@/components/home/AdmissionsCallout'
import { sanityFetch } from '@/lib/sanity/client'
import {
  latestNewsQuery,
  upcomingEventsQuery,
  alumniQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries'
import type { NewsArticle, Event, AlumniAchievement, SiteSettings } from '@/types/sanity'

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
  const [articles, events, alumni, settings] = await Promise.all([
    sanityFetch<NewsArticle[]>({ query: latestNewsQuery, tags: ['newsArticle'] }),
    sanityFetch<Event[]>({ query: upcomingEventsQuery, tags: ['event'] }),
    sanityFetch<AlumniAchievement[]>({ query: alumniQuery, tags: ['alumniAchievement'] }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery, tags: ['siteSettings'] }),
  ])

  return (
    <>
      <HeroParallax />
      <StatsBanner />
      <NewsSection articles={articles} />
      <EventsSection events={events} />
      <HistoryTimeline />
      <BattleOfMaroons />
      <AlumniSection alumni={alumni} />
      <FacebookFeed />
      <AdmissionsCallout settings={settings} />
    </>
  )
}
