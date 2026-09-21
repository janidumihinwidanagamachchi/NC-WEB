import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { ContactForm } from '@/components/contact/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('contact') }
}

export default async function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Get in Touch" title="Contact" highlight="Us" />

      <section className="section relative overflow-hidden">
        <LiveBackground variant="section" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <AnimatedSection>
              <h2 className="section-heading mb-6">
                We&apos;d love to hear <span>from you</span>
              </h2>
              <p className="text-silver-dim mb-8 leading-relaxed">
                Whether you have a question about admissions, want to share an Old Nalandian story,
                or need general information, our team is here to help.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-maroon/10 border border-maroon/20 flex items-center justify-center text-maroon-glow shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-silver-bright font-display">Address</h3>
                    <p className="text-sm text-silver-dim">
                      49/1 Sri Sangaraja Mawatha, Colombo 10, Sri Lanka
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-maroon/10 border border-maroon/20 flex items-center justify-center text-maroon-glow shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="text-silver-bright font-display">Phone</h3>
                    <p className="text-sm text-silver-dim">+94 11 269 5296</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-maroon/10 border border-maroon/20 flex items-center justify-center text-maroon-glow shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-silver-bright font-display">Email</h3>
                    <p className="text-sm text-silver-dim">info@nalandacollege.lk</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-maroon/10 border border-maroon/20 flex items-center justify-center text-maroon-glow shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="text-silver-bright font-display">Office Hours</h3>
                    <p className="text-sm text-silver-dim">Monday – Friday, 7:30 AM – 4:00 PM</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
