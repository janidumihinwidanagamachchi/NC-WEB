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
    <div className="max-w-2xl mx-auto">
      <div className="relative mb-12">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news, events, staff, alumni..."
          className="w-full rounded-xl bg-bg-mid border border-maroon/20 pl-12 pr-4 py-4 text-silver-bright placeholder:text-silver-dim focus:border-maroon-glow focus:outline-none"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-silver-dim" size={20} />
      </div>

      {failed && (
        <p className="text-center text-silver-dim">
          Search is unavailable right now. Please try again later.
        </p>
      )}

      {!failed && query.trim() && results.length === 0 && (
        <p className="text-center text-silver-dim">No results found for &quot;{query}&quot;.</p>
      )}

      <div className="grid gap-4">
        {results.map((item, i) => (
          <Link
            key={`${item._type}-${item.slug?.current ?? i}`}
            href={hrefFor(item)}
            className="card p-5 block hover:border-maroon-glow/50"
          >
            <span className="text-xs uppercase tracking-wider text-maroon-glow">{item._type}</span>
            <h3 className="text-lg font-display text-silver-bright mt-1">{titleFor(item)}</h3>
            {excerptFor(item) && (
              <p className="text-sm text-silver-dim line-clamp-2 mt-1">{excerptFor(item)}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
