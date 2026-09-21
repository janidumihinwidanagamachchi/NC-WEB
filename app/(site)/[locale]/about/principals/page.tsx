import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { BannerCard } from '@/components/ui/BannerCard'
import { sanityFetch } from '@/lib/sanity/client'
import { staffQuery } from '@/lib/sanity/queries'
import type { StaffMember } from '@/types/sanity'

const IMAGES = [
  'https://picsum.photos/seed/nalanda-principal-1/600/800',
  'https://picsum.photos/seed/nalanda-principal-2/600/800',
  'https://picsum.photos/seed/nalanda-principal-3/600/800',
]

const DEMO: StaffMember[] = [
  {
    _id: 'p1',
    _type: 'staffMember',
    name: 'Mr. K. K. Liyanage',
    designation: 'Principal',
    isPrincipal: true,
  },
  { _id: 'p2', _type: 'staffMember', name: 'Mrs. S. Perera', designation: 'Vice Principal' },
  { _id: 'p3', _type: 'staffMember', name: 'Mr. R. Fernando', designation: 'Vice Principal' },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('principals') }
}

export default async function PrincipalsPage() {
  const staff = await sanityFetch<StaffMember[]>({ query: staffQuery, tags: ['staffMember'] })
  const principals = staff.filter((s) => s.isPrincipal).length
    ? staff.filter((s) => s.isPrincipal)
    : DEMO

  return (
    <>
      <PageHeader eyebrow="Leadership" title="Past & Present" highlight="Principals" />

      <section className="section">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {principals.map((p, i) => (
              <Reveal key={p._id} delay={i * 0.08} className="h-full">
                <BannerCard
                  href="/about/principals"
                  image={IMAGES[i % IMAGES.length]}
                  title={p.name}
                  meta={p.designation}
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
