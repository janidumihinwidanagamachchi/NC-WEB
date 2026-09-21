import { sanityFetch } from '@/lib/sanity/client'
import { searchQuery } from '@/lib/sanity/queries'
import { Link } from '@/lib/navigation'
import { PageHeader } from '@/components/shared/PageHeader'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Search } from 'lucide-react'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = '' } = await searchParams
  const results = q
    ? await sanityFetch<Record<string, unknown>[]>({
        query: searchQuery,
        params: { term: `${q}*` },
        tags: ['newsArticle', 'event', 'staffMember', 'alumniAchievement'],
      })
    : []

  const getTitle = (r: Record<string, unknown>) =>
    (r.title as string) || (r.name as string) || 'Untitled'
  const getHref = (r: Record<string, unknown>) => {
    const slug = (r.slug as { current?: string })?.current
    if (r._type === 'newsArticle') return `/news/${slug}`
    if (r._type === 'event') return `/events/${slug}`
    return '/'
  }

  return (
    <>
      <PageHeader eyebrow="Find" title="Search" highlight="Site" />

      <section className="section relative overflow-hidden min-h-screen">
        <LiveBackground variant="section" />
        <div className="container relative">
          <AnimatedSection>
            <form action="search" method="get" className="max-w-2xl mx-auto mb-12 relative">
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search news, events, staff, alumni..."
                className="w-full rounded-xl bg-bg-mid border border-maroon/20 pl-12 pr-4 py-4 text-silver-bright placeholder:text-silver-dim focus:border-maroon-glow focus:outline-none"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-silver-dim"
                size={20}
              />
            </form>
          </AnimatedSection>

          {q && results.length === 0 && (
            <p className="text-center text-silver-dim">No results found for &quot;{q}&quot;.</p>
          )}

          <div className="grid gap-4 max-w-3xl mx-auto">
            {results.map((r: Record<string, unknown>) => (
              <AnimatedSection key={r._id as string}>
                <Link href={getHref(r)} className="card p-5 block hover:border-maroon-glow/50">
                  <span className="text-xs uppercase tracking-wider text-maroon-glow">
                    {r._type as string}
                  </span>
                  <h3 className="text-lg font-display text-silver-bright mt-1">{getTitle(r)}</h3>
                  <p className="text-sm text-silver-dim line-clamp-2 mt-1">
                    {(r.excerpt as string) ||
                      (r.achievement as string) ||
                      (r.designation as string)}
                  </p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
