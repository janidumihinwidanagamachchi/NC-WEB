import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { IconBox } from '@/components/ui/IconBox'
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

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              align="center"
              title={
                <>
                  A tradition of <span>champions</span>
                </>
              }
              lead="Nalanda has a proud sporting tradition that builds discipline, teamwork, and national champions."
            />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {SPORTS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} className="h-full">
                <IconBox icon={s.icon} title={s.title} text={s.desc} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
