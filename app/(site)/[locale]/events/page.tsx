import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { sanityFetch } from '@/lib/sanity/client'
import { allEventsQuery } from '@/lib/sanity/queries'
import { CountdownTimer } from '@/components/shared/CountdownTimer'
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

      <section className="section relative overflow-hidden">
        <LiveBackground variant="section" />
        <div className="container relative">
          {featured && (
            <AnimatedSection className="card p-8 md:p-12 text-center mb-12">
              <span className="badge badge-maroon mb-4">{featured.type}</span>
              <h2 className="text-3xl md:text-4xl font-display text-silver-bright mb-4">
                {featured.title}
              </h2>
              <p className="text-silver-dim mb-8">
                {featured.location} ·{' '}
                {new Date(featured.startDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <CountdownTimer target={featured.startDate} />
            </AnimatedSection>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {items.map((event, i) => (
              <AnimatedSection key={event._id} delay={i * 0.08}>
                <div className="card p-6 flex gap-5">
                  <div className="shrink-0 w-16 h-16 rounded-xl bg-maroon/10 border border-maroon/20 flex flex-col items-center justify-center text-maroon-glow">
                    <span className="text-lg font-bold font-display">
                      {new Date(event.startDate).getDate()}
                    </span>
                    <span className="text-[10px] uppercase">
                      {new Date(event.startDate).toLocaleDateString('en-GB', { month: 'short' })}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-silver-bright text-lg">{event.title}</h3>
                    <p className="text-sm text-silver-dim">
                      {event.location} · {event.type}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
