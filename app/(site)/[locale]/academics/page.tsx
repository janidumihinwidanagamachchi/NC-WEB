import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
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

      <section className="section relative overflow-hidden">
        <LiveBackground variant="section" />
        <div className="container relative">
          <AnimatedSection className="text-center mb-12">
            <p className="text-silver-dim max-w-2xl mx-auto">
              Nalanda offers a rigorous national curriculum from Grade 1 through Advanced Level,
              designed to develop critical thinking, creativity, and character.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {STREAMS.map((s, i) => (
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
