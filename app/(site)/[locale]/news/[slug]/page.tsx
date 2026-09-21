import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { sanityFetch } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { newsBySlugQuery, relatedNewsQuery, allNewsQuery } from '@/lib/sanity/queries'
import { PortableText } from '@/components/shared/PortableText'
import { Link } from '@/lib/navigation'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { ArrowLeft, Calendar, Share2 } from 'lucide-react'
import type { NewsArticle } from '@/types/sanity'

const DEMO: NewsArticle = {
  _id: 'demo',
  _type: 'newsArticle',
  title: 'Nalanda Celebrates Century of Excellence',
  slug: { current: 'nalanda-celebrates-century' },
  excerpt: 'A look back at 100 years of shaping Sri Lankan leaders.',
  body: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Nalanda College marked its centenary with a series of events honouring its legacy, students, and alumni.',
        },
      ],
    },
  ],
  category: 'General',
  publishedAt: new Date().toISOString(),
}

export async function generateStaticParams() {
  const articles = await sanityFetch<NewsArticle[]>({ query: allNewsQuery, tags: ['newsArticle'] })
  const slugs = articles.length ? articles : [DEMO]
  return slugs.map((a) => ({ slug: a.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  const article = await sanityFetch<NewsArticle | null>({
    query: newsBySlugQuery,
    params: { slug },
    tags: ['newsArticle'],
  })
  return {
    title: article?.title ?? t('news'),
    description: article?.excerpt,
  }
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  const article = await sanityFetch<NewsArticle | null>({
    query: newsBySlugQuery,
    params: { slug },
    tags: ['newsArticle'],
  })

  if (!article && slug !== DEMO.slug.current) {
    notFound()
  }

  const item = article ?? DEMO

  const related = await sanityFetch<NewsArticle[]>({
    query: relatedNewsQuery,
    params: { slug: item.slug.current, category: item.category },
    tags: ['newsArticle'],
  })

  return (
    <>
      <section className="pt-32 pb-16 relative overflow-hidden">
        <LiveBackground variant="section" />
        <div className="container relative">
          <AnimatedSection>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-silver-dim hover:text-maroon-glow transition-colors mb-6"
            >
              <ArrowLeft size={16} /> Back to News
            </Link>

            <span className="badge badge-maroon mb-4">{item.category}</span>
            <h1 className="text-3xl sm:text-5xl font-bold font-display text-silver-bright max-w-4xl mb-6">
              {item.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-silver-dim mb-8">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(item.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <button className="flex items-center gap-1.5 hover:text-maroon-glow transition-colors">
                <Share2 size={14} /> Share
              </button>
            </div>

            {item.coverImage && (
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-10">
                <Image
                  src={urlFor(item.coverImage).url()}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            )}
          </AnimatedSection>

          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            <AnimatedSection>
              <article className="prose prose-invert max-w-none">
                {item.body ? (
                  <PortableText value={item.body} />
                ) : (
                  <p className="text-silver-dim">{item.excerpt}</p>
                )}
              </article>
            </AnimatedSection>

            <aside>
              <AnimatedSection delay={0.1}>
                <div className="card p-6 sticky top-24">
                  <h3 className="font-display text-silver-bright mb-4">Related News</h3>
                  {related.length ? (
                    <ul className="space-y-4">
                      {related.map((r) => (
                        <li key={r._id}>
                          <Link
                            href={`/news/${r.slug.current}`}
                            className="text-sm text-silver-dim hover:text-maroon-glow transition-colors line-clamp-2"
                          >
                            {r.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-silver-dim">No related articles yet.</p>
                  )}
                </div>
              </AnimatedSection>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
