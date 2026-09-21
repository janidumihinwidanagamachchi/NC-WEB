import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { sanityFetch } from '@/lib/sanity/client'
import { allEventsQuery } from '@/lib/sanity/queries'
import { CountdownTimer } from '@/components/shared/CountdownTimer'
import { Clock } from 'lucide-react'
import type { Event } from '@/types/sanity'

const DEMO: Event[] = [
  {
    _id: 'e1',
    _type: 'event',
    title: 'Annual Prize Giving 2026',
    slug: { current: 'annual-prize-giving-2026' },
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    location: 'College Main Hall',
    type: 'Academic',
  },
  {
    _id: 'e2',
    _type: 'event',
    title: 'Inter-House Athletics Meet',
    slug: { current: 'inter-house-athletics' },
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    location: 'College Grounds',
    type: 'Sports',
  },
]

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('events') }
}

export default async function EventsPage() {
  const events = await sanityFetch<Event[]>({ query: allEventsQuery, tags: ['event'] })
  const items = events.length ? events : DEMO
  const upcoming = items.filter((e) => new Date(e.startDate) > new Date())
  const featured = upcoming[0] ?? items[0]

  return (
    <>
      <PageHeader eyebrow="Calendar" title="Events &" highlight="Happenings" />

      <section className="section">
        <div className="container">
          {featured && (
            <Reveal>
              <div className="mb-14 border border-line px-8 py-12 text-center md:px-16">
                <span className="badge badge-maroon">{featured.type}</span>
                <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl">{featured.title}</h2>
                <p className="mt-3 text-body">
                  {featured.location} ·{' '}
                  {new Date(featured.startDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <div className="mt-9">
                  <CountdownTimer target={featured.startDate} />
                </div>
              </div>
            </Reveal>
          )}

          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            {items.map((event, i) => (
              <Reveal key={event._id} delay={i * 0.04} className="h-full">
                <div className="flex h-full flex-col justify-between gap-6 bg-bg p-8 transition-colors hover:bg-bg-panel">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    <Clock size={14} className="text-dim" />
                    <span>{fmtDate(event.startDate)}</span>
                  </div>
                  <h3 className="font-display text-2xl text-heading">{event.title}</h3>
                  <p className="text-sm text-dim">
                    {event.location} · {event.type}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
