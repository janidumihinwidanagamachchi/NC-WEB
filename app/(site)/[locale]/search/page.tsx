import { PageHeader } from '@/components/shared/PageHeader'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { SearchClient } from '@/components/search/SearchClient'

export default function SearchPage() {
  return (
    <>
      <PageHeader eyebrow="Find" title="Search" highlight="Site" />

      <section className="section relative overflow-hidden min-h-screen">
        <LiveBackground variant="section" />
        <div className="container relative">
          <AnimatedSection>
            <SearchClient />
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
