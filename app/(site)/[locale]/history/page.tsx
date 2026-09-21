import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('history') }
}

const MILESTONES = [
  {
    year: 1924,
    title: 'Foundation',
    desc: 'Nalanda College was established in Colombo by Buddhist leaders.',
  },
  { year: 1940, title: 'Advanced Level', desc: 'First batch of A/L students began their studies.' },
  { year: 1956, title: 'National School', desc: 'Gazetted as a National School of Sri Lanka.' },
  {
    year: 1968,
    title: 'Cricket Champions',
    desc: 'Won the Colombo Schools Cricket League for the first time.',
  },
  {
    year: 2000,
    title: 'Digital Leap',
    desc: 'Introduced computer laboratories and ICT infrastructure.',
  },
  {
    year: 2024,
    title: 'Centenary',
    desc: 'Celebrated 100 years of excellence with island-wide events.',
  },
]

export default async function HistoryPage() {
  return (
    <>
      <PageHeader eyebrow="Our Legacy" title="History of" highlight="Nalanda" />

      <section className="section relative overflow-hidden">
        <LiveBackground variant="section" />
        <div className="container relative">
          <div className="relative border-l-2 border-maroon/30 ml-4 md:ml-0 md:pl-0 space-y-12">
            {MILESTONES.map((m, i) => (
              <AnimatedSection key={m.year} delay={i * 0.1}>
                <div className="md:flex items-start gap-8">
                  <div className="md:w-32 shrink-0 text-maroon-glow font-display text-2xl font-bold md:text-right">
                    {m.year}
                  </div>
                  <div className="relative pl-8 md:pl-0">
                    <div className="absolute left-[-33px] md:left-[-41px] top-2 w-4 h-4 rounded-full bg-maroon-glow border-4 border-bg-deep" />
                    <h3 className="text-xl font-display text-silver-bright mb-2">{m.title}</h3>
                    <p className="text-silver-dim">{m.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
