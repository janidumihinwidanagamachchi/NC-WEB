import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { Link } from '@/lib/navigation'
import { Calendar, ArrowRight } from 'lucide-react'
import { sanityFetch } from '@/lib/sanity/client'
import { allNewsQuery } from '@/lib/sanity/queries'
import type { NewsArticle } from '@/types/sanity'

const DEMO: NewsArticle[] = [
  {
    _id: '1',
    _type: 'newsArticle',
    title: 'Nalanda Achieves Record A/L Results for 2025',
    slug: { current: 'nalanda-record-al-results-2025' },
    excerpt: 'Our students surpassed all expectations with an unprecedented 98% pass rate.',
    category: 'Academic',
    publishedAt: '2026-04-28T00:00:00Z',
  },
  {
    _id: '2',
    _type: 'newsArticle',
    title: 'Nalanda Clinches Battle of the Maroons 2026',
    slug: { current: 'battle-of-the-maroons-2026' },
    excerpt: 'A breathtaking final session saw Nalanda secure a 5-wicket victory.',
    category: 'Sports',
    publishedAt: '2026-04-15T00:00:00Z',
  },
  {
    _id: '3',
    _type: 'newsArticle',
    title: 'Annual Prize Giving — A Night of Excellence',
    slug: { current: 'annual-prize-giving-2025' },
    excerpt: 'The 2025 Annual Prize Giving Ceremony celebrated over 200 student achievements.',
    category: 'Cultural',
    publishedAt: '2026-03-30T00:00:00Z',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  Academic: '#c8960c',
  Sports: '#6b0f1a',
  Cultural: '#2a5f3f',
  Alumni: '#1a3a6b',
  General: '#5a2d82',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('news') }
}

export default async function NewsPage() {
  const articles = await sanityFetch<NewsArticle[]>({ query: allNewsQuery, tags: ['newsArticle'] })
  const items = articles.length ? articles : DEMO

  return (
    <>
      <PageHeader eyebrow="Stay Informed" title="News &" highlight="Announcements" />

      <section className="section relative overflow-hidden min-h-screen">
        <LiveBackground variant="section" />
        <div className="container relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <AnimatedSection key={item._id} delay={i * 0.08}>
                <article className="card group h-full flex flex-col">
                  <div
                    className="h-1"
                    style={{ background: CATEGORY_COLORS[item.category] ?? '#c8960c' }}
                  />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge badge-gold">{item.category}</span>
                      <span className="flex items-center gap-1 text-silver-dim text-xs">
                        <Calendar size={11} />
                        {new Date(item.publishedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className="text-silver-bright font-semibold mb-3 group-hover:text-maroon-glow transition-colors font-display text-base leading-snug line-clamp-3">
                      {item.title}
                    </h2>
                    <p className="text-silver-dim text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
                      {item.excerpt}
                    </p>
                    <Link
                      href={`/news/${item.slug.current}`}
                      className="inline-flex items-center gap-1.5 text-maroon-glow text-sm font-medium hover:gap-3 transition-all"
                    >
                      Read more <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
