import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { Music, Mic2, Drama, HeartHandshake } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('extracurricular') }
}

const ACTIVITIES = [
  {
    icon: Music,
    title: 'Eastern & Western Bands',
    desc: 'Marching band, brass band, and oriental music ensembles.',
  },
  {
    icon: Mic2,
    title: 'Debating & Public Speaking',
    desc: 'National-level debate and oratory champions.',
  },
  {
    icon: Drama,
    title: 'Dramatic Society',
    desc: 'Award-winning theatre productions and national drama festivals.',
  },
  {
    icon: HeartHandshake,
    title: 'Clubs & Societies',
    desc: 'Astronomy, ICT, Science, Buddhist, and language societies.',
  },
]

export default async function ExtracurricularPage() {
  return (
    <>
      <PageHeader eyebrow="Beyond the Classroom" title="Clubs &" highlight="Societies" />

      <section className="section relative overflow-hidden">
        <LiveBackground variant="section" />
        <div className="container relative">
          <AnimatedSection className="text-center mb-12">
            <p className="text-silver-dim max-w-2xl mx-auto">
              Nalanda believes in holistic development. Our clubs and societies let students explore
              talents, serve the community, and build lifelong friendships.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {ACTIVITIES.map((a, i) => (
              <AnimatedSection key={a.title} delay={i * 0.1}>
                <div className="card p-6 flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-maroon/10 border border-maroon/20 flex items-center justify-center text-maroon-glow">
                    <a.icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-display text-silver-bright mb-2">{a.title}</h3>
                    <p className="text-sm text-silver-dim leading-relaxed">{a.desc}</p>
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
