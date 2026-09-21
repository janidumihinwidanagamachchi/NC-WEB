import { BookOpen, ClipboardList, Trophy, Users } from 'lucide-react'
import { Placeholder } from '@/components/ui/Placeholder'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { IconBox } from '@/components/ui/IconBox'

const PILLARS = [
  {
    icon: BookOpen,
    title: 'Academics',
    text: 'Three A/L streams across the sciences, arts and commerce, with results among the island\u2019s best.',
    href: '/academics',
  },
  {
    icon: Trophy,
    title: 'Sports',
    text: '48 national inter-school titles — led by the century-old Battle of the Maroons tradition.',
    href: '/sports',
  },
  {
    icon: Users,
    title: 'Clubs & Societies',
    text: '80+ clubs and societies in service, culture, scouting, science and the arts.',
    href: '/extracurricular',
  },
  {
    icon: ClipboardList,
    title: 'Admissions',
    text: 'Join a century of learning, leadership and service to the nation.',
    href: '/admissions',
  },
]

export function Pillars() {
  return (
    <section className="section border-b border-line">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="With care and respect we inspire"
            title="Excellence in every <span>endeavour.</span>"
            lead="Four pillars carry the Nalanda tradition forward — moulding character as much as intellect, and service leaders for Sri Lanka and the wider world."
          />
        </Reveal>

        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          <Reveal className="h-full">
            <Placeholder
              label="Nalanda · Spirit"
              className="aspect-[4/5] min-h-[320px] lg:aspect-auto lg:h-full"
            />
          </Reveal>

          <div className="grid content-start gap-4 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="h-full">
                <IconBox
                  icon={p.icon}
                  title={p.title}
                  text={p.text}
                  href={p.href}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
