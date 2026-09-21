import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { sanityFetch } from '@/lib/sanity/client'
import { alumniQuery } from '@/lib/sanity/queries'
import type { AlumniAchievement } from '@/types/sanity'

const DEMO: AlumniAchievement[] = [
  {
    _id: 'a1',
    _type: 'alumniAchievement',
    name: 'Bandula Warnapura',
    field: 'Sports',
    achievement: "Sri Lanka's first Test cricket captain.",
    batch: 1972,
  },
  {
    _id: 'a2',
    _type: 'alumniAchievement',
    name: 'Dr. Anil Jasinghe',
    field: 'Medicine',
    achievement: 'Former Director General of Health Services, Sri Lanka.',
    batch: 1984,
  },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('alumni') }
}

export default async function AlumniPage() {
  const alumni = await sanityFetch<AlumniAchievement[]>({
    query: alumniQuery,
    tags: ['alumniAchievement'],
  })
  const items = alumni.length ? alumni : DEMO

  return (
    <>
      <PageHeader eyebrow="Old Nalandians" title="Alumni" highlight="Achievements" />

      <section className="section relative overflow-hidden">
        <LiveBackground variant="section" />
        <div className="container relative">
          <AnimatedSection className="text-center mb-12">
            <p className="text-silver-dim max-w-2xl mx-auto">
              Old Nalandians continue to shape Sri Lanka and the world across every field of human
              endeavour.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((person, i) => (
              <AnimatedSection key={person._id} delay={i * 0.1}>
                <div className="card p-6 text-center h-full">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-bg-mid border border-maroon/20 flex items-center justify-center text-2xl font-display text-maroon-glow">
                    {person.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-display text-silver-bright">{person.name}</h3>
                  <p className="text-xs text-maroon-glow uppercase tracking-wider mb-3">
                    {person.field} · Batch {person.batch}
                  </p>
                  <p className="text-sm text-silver-dim">{person.achievement}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
