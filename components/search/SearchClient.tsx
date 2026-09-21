'use client'

import { useEffect, useMemo, useState } from 'react'
import { Link } from '@/lib/navigation'
import { Search } from 'lucide-react'

type SearchItem = {
  _type: string
  title?: string
  titleSi?: string
  excerpt?: string
  name?: string
  designation?: string
  achievement?: string
  category?: string
  batch?: string
  field?: string
  slug?: { current?: string }
}

const INDEX_URL = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/search-index.json`
const MAX_RESULTS = 20

function titleFor(item: SearchItem) {
  return item.title || item.name || 'Untitled'
}

function excerptFor(item: SearchItem) {
  return item.excerpt || item.designation || item.achievement || ''
}

function hrefFor(item: SearchItem) {
  switch (item._type) {
    case 'newsArticle':
      return item.slug?.current ? `/news/${item.slug.current}` : '/news'
    case 'event':
      return '/events'
    case 'staffMember':
      return '/about/principals'
    case 'alumniAchievement':
      return '/alumni'
    default:
      return '/'
  }
}

export function SearchClient() {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<SearchItem[]>([])
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    fetch(INDEX_URL)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: SearchItem[]) => setIndex(Array.isArray(data) ? data : []))
      .catch(() => setFailed(true))
  }, [])

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []
    return index
      .filter((item) => {
        const haystack = [titleFor(item), excerptFor(item), item.category, item.batch, item.field]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(term)
      })
      .slice(0, MAX_RESULTS)
  }, [query, index])

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative mb-12">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news, events, staff, alumni..."
          className="w-full border border-line bg-transparent py-4 pl-12 pr-4 text-heading placeholder:text-dim focus:border-maroon-mid focus:outline-none"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" size={20} />
      </div>

      {failed && (
        <p className="text-center text-dim">
          Search is unavailable right now. Please try again later.
        </p>
      )}

      {!failed && query.trim() && results.length === 0 && (
        <p className="text-center text-dim">No results found for &quot;{query}&quot;.</p>
      )}

      <div className="divide-y divide-line">
        {results.map((item, i) => (
          <Link
            key={`${item._type}-${item.slug?.current ?? i}`}
            href={hrefFor(item)}
            className="group block py-6 transition-colors"
          >
            <span className="text-xs uppercase tracking-[0.18em] text-gold">{item._type}</span>
            <h3 className="mt-1 font-display text-xl text-heading transition-colors group-hover:text-gold-light">
              {titleFor(item)}
            </h3>
            {excerptFor(item) && (
              <p className="mt-1 text-sm text-dim line-clamp-2">{excerptFor(item)}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
