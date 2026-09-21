import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { BannerCard } from '@/components/ui/BannerCard'
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

const IMAGES = [
  'https://picsum.photos/seed/nalanda-alumni-1/600/600',
  'https://picsum.photos/seed/nalanda-alumni-2/600/600',
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

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="mx-auto max-w-2xl text-center leading-relaxed text-body">
              Old Nalandians continue to shape Sri Lanka and the world across every field of human
              endeavour.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((person, i) => (
              <Reveal key={person._id} delay={i * 0.06} className="h-full">
                <BannerCard
                  href="/alumni"
                  image={IMAGES[i % IMAGES.length]}
                  title={person.name}
                  meta={`${person.field} · Batch ${person.batch}`}
                  caption={person.achievement}
                  placeholderLabel="Portrait"
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
