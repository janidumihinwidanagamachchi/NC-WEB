import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { sanityFetch } from '@/lib/sanity/client'
import { staffQuery } from '@/lib/sanity/queries'
import type { StaffMember } from '@/types/sanity'

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

      <section className="section relative overflow-hidden">
        <LiveBackground variant="section" />
        <div className="container relative">
          <div className="grid md:grid-cols-3 gap-6">
            {principals.map((p, i) => (
              <AnimatedSection key={p._id} delay={i * 0.1}>
                <div className="card p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-bg-mid border border-maroon/20 flex items-center justify-center text-2xl font-display text-maroon-glow">
                    {p.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-display text-silver-bright">{p.name}</h3>
                  <p className="text-sm text-maroon-glow">{p.designation}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
