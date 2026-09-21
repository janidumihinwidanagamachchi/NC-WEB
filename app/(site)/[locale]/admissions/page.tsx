import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { Link } from '@/lib/navigation'
import { sanityFetch } from '@/lib/sanity/client'
import { resourcesQuery } from '@/lib/sanity/queries'
import { CheckCircle, FileText, Phone, ArrowRight } from 'lucide-react'
import type { DownloadableResource } from '@/types/sanity'

const STEPS = [
  {
    step: '01',
    title: 'Check Eligibility',
    desc: 'Confirm your child meets the age and academic requirements for the relevant grade entry point.',
  },
  {
    step: '02',
    title: 'Obtain Application Form',
    desc: 'Visit the college office or download the official application form from this page.',
  },
  {
    step: '03',
    title: 'Submit Documents',
    desc: 'Submit the completed application with birth certificate, school report, and passport photos.',
  },
  {
    step: '04',
    title: 'Entrance Assessment',
    desc: 'Shortlisted applicants will be called for an entrance assessment and parent interview.',
  },
  {
    step: '05',
    title: 'Admission Confirmation',
    desc: 'Successful candidates will receive official admission letters. Welcome to the Nalanda family!',
  },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('admissions') }
}

export default async function AdmissionsPage() {
  const resources = await sanityFetch<DownloadableResource[]>({
    query: resourcesQuery,
    tags: ['downloadableResource'],
  })

  return (
    <>
      <PageHeader eyebrow="Join the Legacy" title="Admissions" highlight="2027" />

      <section className="section relative overflow-hidden">
        <LiveBackground variant="section" />
        <div className="container relative max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <p className="text-silver-dim leading-relaxed">
              Applications for the 2027 academic year are now open. We welcome applications from
              students of all backgrounds who share our commitment to excellence, wisdom, and
              service.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="section-heading mb-10">
              How to <span>Apply</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-5 mb-14">
            {STEPS.map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 0.08}>
                <div className="card p-6 flex gap-5 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold border border-maroon/30 bg-maroon/10 text-maroon-glow font-display">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-silver-bright font-semibold mb-1">{s.title}</h3>
                    <p className="text-silver-dim text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            <AnimatedSection>
              <div className="card p-6">
                <Phone size={20} className="text-maroon-glow mb-3" />
                <h3 className="text-silver-bright font-semibold mb-2">Call the Office</h3>
                <a href="tel:+94112695296" className="text-maroon-glow hover:underline text-sm">
                  +94 11 269 5296
                </a>
                <p className="text-silver-dim text-xs mt-1">Mon–Fri, 7:30 AM – 4:00 PM</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="card p-6">
                <FileText size={20} className="text-maroon-glow mb-3" />
                <h3 className="text-silver-bright font-semibold mb-2">Download Forms</h3>
                <p className="text-silver-dim text-sm mb-3">
                  Official application and information packs.
                </p>
                {resources.length ? (
                  <ul className="space-y-2">
                    {resources.map((r) => (
                      <li key={r._id}>
                        <a
                          href={r.fileUrl}
                          download
                          className="text-sm text-maroon-glow hover:underline flex items-center gap-1"
                        >
                          <CheckCircle size={12} /> {r.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <button className="btn btn-ghost text-xs py-1.5 px-4" disabled>
                    Forms coming soon
                  </button>
                )}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="text-center">
            <p className="text-silver-dim text-sm mb-4">
              Have a question? Our admissions team is happy to help.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact Admissions <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
