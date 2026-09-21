import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { Trophy, Dumbbell, Waves, Users } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('sports') }
}

const SPORTS = [
  {
    icon: Trophy,
    title: 'Cricket',
    desc: 'Home of the Battle of the Maroons and multiple national titles.',
  },
  { icon: Dumbbell, title: 'Rugby', desc: 'Bradby Shield contenders with a proud history.' },
  { icon: Waves, title: 'Swimming', desc: 'National aquatic champions year after year.' },
  { icon: Users, title: 'Athletics', desc: 'Track and field excellence at national school meets.' },
]

export default async function SportsPage() {
  return (
    <>
      <PageHeader eyebrow="On the Field" title="Sports" highlight="Excellence" />

      <section className="section relative overflow-hidden">
        <LiveBackground variant="section" />
        <div className="container relative">
          <AnimatedSection className="text-center mb-12">
            <p className="text-silver-dim max-w-2xl mx-auto">
              Nalanda has a proud sporting tradition that builds discipline, teamwork, and national
              champions.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {SPORTS.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="card p-6 flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-maroon/10 border border-maroon/20 flex items-center justify-center text-maroon-glow">
                    <s.icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-display text-silver-bright mb-2">{s.title}</h3>
                    <p className="text-sm text-silver-dim leading-relaxed">{s.desc}</p>
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
