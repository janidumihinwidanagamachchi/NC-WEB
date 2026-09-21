import { ArrowRight, Clock } from 'lucide-react'
import { Link } from '@/lib/navigation'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
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
    title: 'Centennial Thanksgiving',
    slug: { current: 'centennial-thanksgiving' },
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    location: 'College Grounds',
    type: 'Cultural',
  },
]

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export function EventsStrip({ events }: { events?: Event[] }) {
  const items = events?.length ? events : DEMO

  return (
    <section className="section border-b border-line">
      <div className="container">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Upcoming"
              title="Events & <span>Happenings</span>"
              className="mb-0"
            />
            <Link href="/events" className="link-arrow mb-2 shrink-0">
              All events <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
          {items.slice(0, 2).map((event, i) => (
            <Reveal key={event._id} delay={i * 0.08} className="h-full">
              <Link
                href={`/events/${event.slug?.current ?? ''}`}
                className="group flex h-full flex-col justify-between gap-6 bg-bg p-8 transition-colors hover:bg-bg-panel"
              >
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  <Clock size={14} className="text-dim" />
                  <span>{fmtDate(event.startDate)}</span>
                </div>
                <span className="font-display text-2xl text-heading transition-colors group-hover:text-gold-light">
                  {event.title}
                </span>
                <span className="flex items-center justify-between text-sm text-dim">
                  {event.location} · {event.type}
                  <ArrowRight
                    size={16}
                    className="text-dim transition-all group-hover:translate-x-1 group-hover:text-gold"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
