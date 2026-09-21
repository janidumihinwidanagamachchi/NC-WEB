import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { ContactForm } from '@/components/contact/ContactForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('contact') }
}

const CONTACTS = [
  {
    label: 'Email',
    value: 'info@nalandacollege.lk',
    href: 'mailto:info@nalandacollege.lk',
  },
  {
    label: 'Office',
    value: '49/1 Sri Sangaraja Mawatha, Colombo 10, Sri Lanka',
  },
  {
    label: 'Phone',
    value: '+94 11 269 5296',
    href: 'tel:+94112695296',
  },
  {
    label: 'Office Hours',
    value: 'Monday – Friday, 7:30 AM – 4:00 PM',
  },
]

export default async function ContactPage() {
  return (
    <>
      <section
        className="section-hero section--bg relative overflow-hidden border-b border-line"
        style={{ backgroundImage: 'url(/images/funeralhome2-services-bg1.webp)' }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 text-center">
          <h1 className="mx-auto max-w-3xl font-display text-2xl leading-[1.9] text-cream md:text-[32px]">
            With care and respect
          </h1>
          <h4 className="mt-4 text-body">we&apos;d love to hear from you.</h4>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACTS.map((c) => (
              <Reveal key={c.label}>
                <div className="text-center">
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-dim">
                    {c.label}
                  </p>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="block font-display text-lg text-heading transition-colors hover:text-gold"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="font-display text-lg text-heading">{c.value}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section--bg relative overflow-hidden"
        style={{ backgroundImage: 'url(/images/funeralhome2-contact-bg1.webp)' }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10">
          <div className="flex flex-wrap items-stretch justify-center">
            <div className="w-full p-4 md:w-1/2">
              <Reveal className="h-full">
                <div className="h-full bg-bg-panel p-8 md:p-16">
                  <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-dim">
                    WITH CARE AND RESPECT
                  </p>
                  <h3 className="mt-4 text-center">Consult an admissions expert.</h3>
                  <div className="mt-8">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="w-full self-end p-4 md:w-1/2">
              <Reveal>
                <a
                  href="tel:+94112695296"
                  className="group block bg-cream p-8 transition-colors hover:bg-cream/90 md:p-10"
                >
                  <div className="flex flex-col items-center gap-6 md:flex-row">
                    <Image
                      src="/images/funeralhome2-contact-pic1.webp"
                      alt="Call us"
                      width={250}
                      height={250}
                      className="shrink-0"
                    />
                    <div className="text-center md:text-left">
                      <h4 className="text-bg">+94 11 269 5296</h4>
                      <p className="mt-1 text-sm text-dim">
                        <b className="text-bg">CALL US</b> – Admissions Office
                      </p>
                    </div>
                  </div>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
