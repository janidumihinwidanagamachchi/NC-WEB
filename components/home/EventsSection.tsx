import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/navigation'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
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
]

export async function EventsSection({ events }: { events?: Event[] }) {
  const t = await getTranslations()
  const items = events?.length ? events : DEMO
  const featured = items[0]

  return (
    <section className="relative section overflow-hidden">
      <LiveBackground variant="section" />

      <div className="container relative">
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-2 text-maroon-glow">
            Upcoming
          </p>
          <h2 className="section-heading">
            Events & <span>Happenings</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <AnimatedSection>
            <div className="card p-8 text-center">
              <span className="badge badge-maroon mb-4">{featured.type}</span>
              <h3 className="text-2xl font-display text-silver-bright mb-4">{featured.title}</h3>
              <div className="flex items-center justify-center gap-4 text-sm text-silver-dim mb-8">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {new Date(featured.startDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                {featured.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} /> {featured.location}
                  </span>
                )}
              </div>
              <CountdownTimer target={featured.startDate} />
              <Link
                href={`/events/${featured.slug?.current ?? ''}`}
                className="btn btn-primary mt-8 text-sm"
              >
                {t('common.readMore')} <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {items.slice(0, 4).map((event, i) => (
              <AnimatedSection key={event._id} delay={i * 0.1}>
                <Link
                  href={`/events/${event.slug?.current ?? ''}`}
                  className="card p-5 flex items-center gap-5 group"
                >
                  <div className="shrink-0 w-16 h-16 rounded-xl bg-maroon/10 border border-maroon/20 flex flex-col items-center justify-center text-maroon-glow">
                    <span className="text-lg font-bold font-display">
                      {new Date(event.startDate).getDate()}
                    </span>
                    <span className="text-[10px] uppercase">
                      {new Date(event.startDate).toLocaleDateString('en-GB', { month: 'short' })}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-silver-bright group-hover:text-maroon-glow transition-colors truncate">
                      {event.title}
                    </h4>
                    <p className="text-sm text-silver-dim truncate">
                      {event.location} · {event.type}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-silver-dim group-hover:text-maroon-glow group-hover:translate-x-1 transition-all shrink-0"
                  />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
