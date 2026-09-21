import { getTranslations } from 'next-intl/server'
import { PageHeader } from '@/components/shared/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Link } from '@/lib/navigation'
import { sanityFetch } from '@/lib/sanity/client'
import { resourcesQuery } from '@/lib/sanity/queries'
import { CheckCircle, ArrowRight } from 'lucide-react'
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

      <section className="section">
        <div className="container max-w-3xl">
          <Reveal>
            <p className="text-body leading-relaxed">
              Applications for the 2027 academic year are now open. We welcome applications from
              students of all backgrounds who share our commitment to excellence, wisdom, and
              service.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="section-heading mb-10 mt-16">
              How to <span>Apply</span>
            </h2>
          </Reveal>

          <Reveal>
            <ol className="divide-y divide-line border-y border-line">
              {STEPS.map((s) => (
                <li
                  key={s.step}
                  className="grid gap-1 py-7 sm:grid-cols-[64px_1fr] sm:gap-6 sm:items-baseline"
                >
                  <span className="font-display text-3xl text-gold">{s.step}</span>
                  <div>
                    <h3 className="text-xl text-heading">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <Reveal>
              <div className="h-full border border-line p-7">
                <p className="eyebrow">Call the Office</p>
                <a
                  href="tel:+94112695296"
                  className="mt-4 block font-display text-2xl text-heading transition-colors hover:text-gold"
                >
                  +94 11 269 5296
                </a>
                <p className="mt-2 text-sm text-dim">Mon–Fri, 7:30 AM – 4:00 PM</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full border border-line p-7">
                <p className="eyebrow">Download Forms</p>
                <p className="mt-4 text-sm text-body">
                  Official application and information packs.
                </p>
                {resources.length ? (
                  <ul className="mt-4 space-y-2">
                    {resources.map((r) => (
                      <li key={r._id}>
                        <a
                          href={r.fileUrl}
                          download
                          className="flex items-center gap-2 text-sm text-gold hover:text-maroon-glow"
                        >
                          <CheckCircle size={13} /> {r.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <button className="btn btn-ghost mt-3 px-0 text-xs" disabled>
                    Forms coming soon
                  </button>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-14 text-center">
            <p className="mb-6 text-sm text-dim">
              Have a question? Our admissions team is happy to help.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact Admissions <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
