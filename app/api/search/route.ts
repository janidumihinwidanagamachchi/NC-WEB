import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity/client'
import { searchQuery } from '@/lib/sanity/queries'

export async function GET(req: NextRequest) {
  const term = req.nextUrl.searchParams.get('q') || ''
  if (!term) return NextResponse.json([])

  const results = await sanityFetch<unknown[]>({
    query: searchQuery,
    params: { term: `${term}*` },
    tags: ['newsArticle', 'event', 'staffMember', 'alumniAchievement'],
  })

  return NextResponse.json(results)
}
