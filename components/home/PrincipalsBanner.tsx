import { Link } from '@/lib/navigation'
import { ArrowRight } from 'lucide-react'
import { BannerCard } from '@/components/ui/BannerCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'

const PAST_PRINCIPALS = [
  {
    name: 'Mr. K. K. Liyanage',
    term: 'Past Principal',
    blurb: 'Stewarded the College through a decade of growth in the modern era.',
  },
  {
    name: 'Mrs. S. Perera',
    term: 'Past Principal',
    blurb: 'Championed academic excellence and co-curricular breadth.',
  },
  {
    name: 'Mr. R. Fernando',
    term: 'Past Principal',
    blurb: 'Expanded sporting and scouting traditions across the school.',
  },
]

export function PrincipalsBanner() {
  return (
    <section className="section border-b border-line">
      <div className="container">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>With care and respect we remember</Eyebrow>
              <h2 className="section-heading mt-4">
                Our Past <span>Principals</span>
              </h2>
            </div>
            <Link href="/about/principals" className="link-arrow mb-1 shrink-0">
              All past principals <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PAST_PRINCIPALS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <BannerCard
                href="/about/principals"
                title={p.name}
                meta={p.term}
                caption={p.blurb}
                placeholderLabel="Portrait"
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
