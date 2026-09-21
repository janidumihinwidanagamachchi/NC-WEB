import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Link } from '@/lib/navigation'
import { ArrowRight } from 'lucide-react'
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

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

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

      <section className="section">
        <div className="container">
          <div className="divide-y divide-line border-b border-line">
            {items.map((item, i) => (
              <Reveal key={item._id} delay={i * 0.04}>
                <Link
                  href={`/news/${item.slug.current}`}
                  className="group grid gap-3 py-8 transition-colors sm:grid-cols-[150px_1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-dim">
                    {fmtDate(item.publishedAt)}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-xl text-heading transition-colors group-hover:text-gold-light sm:text-2xl">
                      {item.title}
                    </span>
                    <span className="mt-1.5 block max-w-2xl text-sm text-dim">{item.excerpt}</span>
                  </span>
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-body">
                    <span className="hidden font-normal normal-case tracking-normal text-gold sm:inline">
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
    </>
  )
}
