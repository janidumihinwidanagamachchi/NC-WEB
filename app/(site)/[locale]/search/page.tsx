import { PageHeader } from '@/components/shared/PageHeader'
import { SearchClient } from '@/components/search/SearchClient'

export default function SearchPage() {
  return (
    <>
      <PageHeader eyebrow="Find" title="Search" highlight="Site" />

      <section className="section">
        <div className="container">
          <SearchClient />
        </div>
      </section>
    </>
  )
}
