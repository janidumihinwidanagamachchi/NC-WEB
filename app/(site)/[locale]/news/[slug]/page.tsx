import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { sanityFetch } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { newsBySlugQuery, relatedNewsQuery, allNewsQuery } from '@/lib/sanity/queries'
import { PortableText } from '@/components/shared/PortableText'
import { Reveal } from '@/components/ui/Reveal'
import { Placeholder } from '@/components/ui/Placeholder'
import { Link } from '@/lib/navigation'
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
  const result = await sanityFetch<NewsArticle | null>({
    query: newsBySlugQuery,
    params: { slug },
    tags: ['newsArticle'],
  })
  const article = Array.isArray(result) ? (result[0] ?? null) : result
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
  const result = await sanityFetch<NewsArticle | null>({
    query: newsBySlugQuery,
    params: { slug },
    tags: ['newsArticle'],
  })
  const article = Array.isArray(result) ? (result[0] ?? null) : result

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
      <section className="pb-20 pt-36">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
            <div className="min-w-0">
              <Reveal>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-gold"
                >
                  <ArrowLeft size={15} /> Back to News
                </Link>

                <span className="badge mt-6">{item.category}</span>
                <h1 className="mt-5 max-w-4xl text-4xl sm:text-5xl md:text-6xl">{item.title}</h1>

                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-dim">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-gold" />
                    {new Date(item.publishedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <button className="flex items-center gap-2 transition-colors hover:text-gold">
                    <Share2 size={14} /> Share
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                {item.coverImage ? (
                  <div className="mt-10 aspect-video overflow-hidden border border-line">
                    <Image
                      src={urlFor(item.coverImage).url()}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 800px"
                      priority
                    />
                  </div>
                ) : (
                  <Placeholder label="News cover" className="mt-10 aspect-video" />
                )}
              </Reveal>

              <Reveal delay={0.12}>
                <div className="prose-article mt-10 max-w-none">
                  {item.body ? <PortableText value={item.body} /> : <p>{item.excerpt}</p>}
                </div>
              </Reveal>
            </div>

            <aside>
              <Reveal delay={0.1}>
                <div className="border border-line p-7 lg:sticky lg:top-24">
                  <p className="eyebrow">Related news</p>
                  {related.length ? (
                    <ul className="mt-6 space-y-5">
                      {related.map((r) => (
                        <li key={r._id}>
                          <Link
                            href={`/news/${r.slug.current}`}
                            className="block font-display text-lg text-heading transition-colors hover:text-gold-light"
                          >
                            {r.title}
                          </Link>
                          <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-dim">
                            {new Date(r.publishedAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-6 text-sm text-dim">No related articles yet.</p>
                  )}
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
