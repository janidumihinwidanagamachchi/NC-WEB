import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { IconBox } from '@/components/ui/IconBox'
import { BookOpen, FlaskConical, Calculator, Globe } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('academics') }
}

const STREAMS = [
  {
    icon: BookOpen,
    title: 'Arts',
    desc: 'History, Geography, Economics, Languages, and Buddhist Civilization.',
  },
  {
    icon: FlaskConical,
    title: 'Science',
    desc: 'Physics, Chemistry, Biology, and Combined Mathematics.',
  },
  {
    icon: Calculator,
    title: 'Commerce',
    desc: 'Accounting, Business Studies, Economics, and ICT.',
  },
  {
    icon: Globe,
    title: 'Technology',
    desc: 'ICT, Engineering Technology, and Bio-Systems Technology.',
  },
]

export default async function AcademicsPage() {
  return (
    <>
      <PageHeader eyebrow="Academic Excellence" title="Academic" highlight="Programmes" />

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              align="center"
              title={
                <>
                  Rigorous study, <span>holistic growth</span>
                </>
              }
              lead="Nalanda offers a rigorous national curriculum from Grade 1 through Advanced Level, designed to develop critical thinking, creativity, and character."
            />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {STREAMS.map((s, i) => (
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
