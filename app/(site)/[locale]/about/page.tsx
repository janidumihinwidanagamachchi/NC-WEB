import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { CheckCircle } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('about') }
}

export default async function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Nalanda"
        highlight="College"
        description="Sri Lanka's premier Buddhist national school, nurturing noble sons endowed with virtues and wisdom since 1924."
      />

      <section className="section relative overflow-hidden">
        <LiveBackground variant="section" />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <h2 className="section-heading mb-6">
              Our <span>Story</span>
            </h2>
            <p className="text-silver-dim leading-relaxed mb-4">
              Founded in 1924 by a group of Buddhist leaders in Colombo, Nalanda College began as a
              small institution with a profound vision: to provide a holistic education rooted in
              Buddhist values and national identity.
            </p>
            <p className="text-silver-dim leading-relaxed mb-6">
              Over the past century, Nalanda has grown into one of Sri Lanka&apos;s largest and most
              respected national schools, producing leaders in politics, medicine, law, sports,
              business, and the arts while staying true to its motto: Wisdom Illuminates Character.
            </p>
            <ul className="space-y-3">
              {[
                '100+ years of excellence',
                'Buddhist values & discipline',
                'National school status since 1956',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-silver-light">
                  <CheckCircle size={18} className="text-maroon-glow" /> {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection>
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-maroon/20 to-bg-card border border-maroon/20" />
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
