import { ArrowRight } from 'lucide-react'
import { Link } from '@/lib/navigation'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { NewsArticle } from '@/types/sanity'

const DEMO: NewsArticle[] = [
  {
    _id: '1',
    _type: 'newsArticle',
    title: '95th Battle of The Maroons — Nalanda vs Dharmaraja',
    slug: { current: 'battle-of-the-maroons-95' },
    excerpt:
      'The 95th Battle of the Maroons cricket encounter was played at the Sinhalese Sports Club grounds.',
    category: 'Sports',
    publishedAt: '2025-03-03T00:00:00Z',
  },
  {
    _id: '2',
    _type: 'newsArticle',
    title: '"විද්‍යාලය නාලන්දා" — Centennial Book Launch',
    slug: { current: 'centennial-book-launch' },
    excerpt:
      "The official launch of the commemorative publication chronicling Nalanda College's 100-year journey.",
    category: 'Cultural',
    publishedAt: '2024-11-19T00:00:00Z',
  },
  {
    _id: '3',
    _type: 'newsArticle',
    title: 'Bandula Warnapura Memorial Lecture 2024',
    slug: { current: 'bandula-warnapura-memorial-lecture' },
    excerpt:
      "The annual memorial lecture held in honour of Sri Lanka's first test cricket captain.",
    category: 'Sports',
    publishedAt: '2024-11-09T00:00:00Z',
  },
]

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export function NewsStrip({ articles }: { articles?: NewsArticle[] }) {
  const items = articles?.length ? articles : DEMO

  return (
    <section className="section border-b border-line">
      <div className="container">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Latest updates"
              title="News & <span>Announcements</span>"
              className="mb-0"
            />
            <Link href="/news" className="link-arrow mb-2 shrink-0">
              View all news <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 divide-y divide-line">
          {items.map((item, i) => (
            <Reveal key={item._id} delay={i * 0.06}>
              <Link
                href={`/news/${item.slug.current}`}
                className="group grid gap-3 py-7 transition-colors hover:bg-bg-panel sm:grid-cols-[130px_1fr_auto] sm:items-baseline sm:gap-6 sm:px-3"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-dim">
                  {fmtDate(item.publishedAt)}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-xl text-heading transition-colors group-hover:text-gold-light">
                    {item.title}
                  </span>
                  <span className="mt-1.5 block max-w-2xl text-sm text-dim">{item.excerpt}</span>
                </span>
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-body">
                  <span className="hidden font-normal normal-case tracking-normal text-dim sm:inline">
                    {item.category}
                  </span>
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
