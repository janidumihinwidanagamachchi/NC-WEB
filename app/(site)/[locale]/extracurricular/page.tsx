import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { IconBox } from '@/components/ui/IconBox'
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

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              align="center"
              title={
                <>
                  Talent, service & <span>friendship</span>
                </>
              }
              lead="Nalanda believes in holistic development. Our clubs and societies let students explore talents, serve the community, and build lifelong friendships."
            />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {ACTIVITIES.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06} className="h-full">
                <IconBox icon={a.icon} title={a.title} text={a.desc} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
