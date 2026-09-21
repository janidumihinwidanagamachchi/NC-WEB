import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { client } from '../lib/sanity/client'

const indexQuery = `*[_type in ["newsArticle","event","staffMember","alumniAchievement"]] {
  _type,
  title,
  titleSi,
  slug,
  excerpt,
  name,
  designation,
  achievement,
  category,
  batch,
  field
}`

async function main() {
  const publicDir = resolve(process.cwd(), 'public')
  const indexPath = resolve(publicDir, 'search-index.json')

  let items: Array<Record<string, unknown>> = []
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    items = await client.fetch<Array<Record<string, unknown>>>(indexQuery)
  }

  mkdirSync(publicDir, { recursive: true })
  writeFileSync(indexPath, JSON.stringify(items), 'utf-8')
  console.log(`[search-index] wrote ${items.length} entries`)
}

main().catch((err) => {
  console.error('[search-index] failed', err)
  process.exit(1)
})
