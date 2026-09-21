import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { ContactForm } from '@/components/contact/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('contact') }
}

const CONTACTS = [
  {
    icon: MapPin,
    title: 'Address',
    lines: ['49/1 Sri Sangaraja Mawatha', 'Colombo 10, Sri Lanka'],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+94 11 269 5296', 'Mon–Fri, 7:30 AM – 4:00 PM'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['info@nalandacollege.lk'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Monday – Friday', '7:30 AM – 4:00 PM'],
  },
]

export default async function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Get in Touch" title="Contact" highlight="Us" />

      <section className="section">
        <div className="container">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Reach the college"
                  title={
                    <>
                      We&apos;d love to hear <span>from you</span>
                    </>
                  }
                  lead="Whether you have a question about admissions, want to share an Old Nalandian story, or need general information, our team is here to help."
                />
              </Reveal>

              <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {CONTACTS.map((c, i) => (
                  <Reveal key={c.title} delay={i * 0.05} className="h-full">
                    <div className="flex h-full flex-col gap-3 bg-bg p-7 transition-colors hover:bg-bg-panel">
                      <c.icon size={18} strokeWidth={1.25} className="text-gold" />
                      <h3 className="text-xl text-heading">{c.title}</h3>
                      {c.lines.map((l) => (
                        <p key={l} className="text-sm text-body">
                          {l}
                        </p>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
