import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { Reveal } from '@/components/ui/Reveal'

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

      <section className="section">
        <div className="container">
          <div className="relative border-l border-line-warm pl-8 sm:pl-12">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.06} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border border-maroon-mid bg-bg">
                  <span className="absolute inset-0 rounded-full bg-maroon-bright" />
                </span>
                <div className="text-gold font-display text-3xl font-normal tracking-tight">
                  {m.year}
                </div>
                <h3 className="mt-2 text-2xl text-heading">{m.title}</h3>
                <p className="mt-2 max-w-2xl text-body leading-relaxed">{m.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
