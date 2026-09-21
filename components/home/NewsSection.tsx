import { Link } from '@/lib/navigation'
import { getTranslations } from 'next-intl/server'
import { Calendar, ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
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

const CATEGORY_COLOR: Record<string, string> = {
  Sports: 'var(--maroon-bright)',
  Academic: 'var(--silver)',
  Cultural: 'var(--silver-muted)',
  Alumni: 'var(--maroon-glow)',
  General: 'rgba(184,184,204,0.4)',
}

export async function NewsSection({ articles }: { articles?: NewsArticle[] }) {
  const t = await getTranslations()
  const items = articles?.length ? articles : DEMO

  return (
    <section className="relative section overflow-hidden">
      <LiveBackground variant="section" />

      <div className="container relative">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-2 text-maroon-glow">
              Latest Updates
            </p>
            <h2 className="section-heading">
              News & <span>Announcements</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all group shrink-0 text-maroon-glow"
          >
            {t('common.viewAll')}{' '}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <AnimatedSection key={item._id} delay={i * 0.1}>
              <article className="card group h-full flex flex-col">
                <div
                  className="h-[2px]"
                  style={{ background: CATEGORY_COLOR[item.category] ?? 'var(--maroon)' }}
                />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge badge-maroon">{item.category}</span>
                    <span className="flex items-center gap-1.5 text-xs text-silver-dim">
                      <Calendar size={11} />
                      {new Date(item.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <h3 className="font-semibold leading-snug mb-3 line-clamp-2 font-display text-base text-silver-bright">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed line-clamp-3 mb-5 flex-1 text-silver-dim">
                    {item.excerpt}
                  </p>

                  <Link
                    href={`/news/${item.slug.current}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium hover:gap-2.5 transition-all text-maroon-glow"
                  >
                    {t('common.readMore')} <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
