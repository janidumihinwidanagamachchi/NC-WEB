import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
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
]

export default async function ContactPage() {
  return (
    <>
      {/* Section 1 · hero title + subhead + contact strip */}
      <section
        className="section-hero section--bg relative overflow-hidden"
        style={{
          backgroundImage: 'url(/images/funeralhome2-services-bg1.webp)',
          backgroundPosition: 'top center',
        }}
      >
        <div className="container text-center">
          <h1 className="font-display text-[24px] font-normal leading-[1.4] tracking-[-0.02em] text-[#E3CAB6] md:text-[32px]">
            With
            <br />
            <span className="text-[4em] leading-[1]">care</span> and
            <span className="text-[4em] leading-[1]">
              <br />
              respect
            </span>
          </h1>

          <h4 className="mt-8 font-sans text-[32px] font-normal leading-[42px] tracking-[-1px] text-[#716861]">
            we&apos;d love to hear from you.
          </h4>

          <div className="mt-12 grid gap-10 text-center sm:grid-cols-3 md:mt-[60px]">
            {CONTACTS.map((c) => (
              <div key={c.label}>
                <p className="font-sans text-[16px] leading-[26px] text-[#716861]">{c.label}</p>
                <h4 className="mb-5 font-sans text-[32px] font-normal leading-[42px] tracking-[-1px] text-[#E3CAB6]">
                  {c.href ? (
                    <a href={c.href} className="transition-colors hover:text-[#FFF6F0]">
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 · dark form card + beige call-to-us card */}
      <section
        className="section section--bg relative overflow-hidden"
        style={{
          backgroundImage: 'url(/images/funeralhome2-contact-bg1.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="flex flex-wrap items-stretch">
            {/* Left · dark form card (#1F2224, 64px padding) */}
            <div className="w-full md:w-1/2">
              <div className="h-full bg-[#1F2224] p-8 md:p-16">
                <p className="font-sans text-[16px] leading-[26px] text-[#7F7F7F]">
                  WITH CARE AND RESPECT
                </p>
                <h3 className="mt-4 font-sans text-[32px] font-normal leading-[36px] tracking-[-1px] text-[#E3CAB6] md:text-[48px] md:leading-[53px]">
                  Consult an admissions expert.
                </h3>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Right · beige call box (#E3CAB6), self-end */}
            <div className="w-full self-end md:ml-8 md:w-1/2">
              <a href="tel:+94112695296" className="block bg-[#E3CAB6] p-10" title="">
                <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
                  <Image
                    src="/images/funeralhome2-contact-pic1.webp"
                    alt="Call us"
                    width={250}
                    height={250}
                    className="shrink-0"
                  />
                  <div>
                    <h4 className="font-sans text-[32px] font-normal leading-[42px] tracking-[-1px] text-[#141414]">
                      +94 11 269 5296
                    </h4>
                    <p className="font-sans text-[16px] leading-[26px] text-[#887464]">
                      <b style={{ color: '#141414' }}>CALL TO US</b> – Admissions Office
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
