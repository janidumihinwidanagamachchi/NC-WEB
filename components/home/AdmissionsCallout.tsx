import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/navigation'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { ArrowRight, Calendar } from 'lucide-react'
import type { SiteSettings } from '@/types/sanity'

export async function AdmissionsCallout({ settings }: { settings?: SiteSettings | null }) {
  const t = await getTranslations()
  const open = settings?.admissionsOpen ?? false
  const banner =
    settings?.admissionsBanner ?? 'Applications for the 2027 academic year are now open.'

  return (
    <section className="relative section overflow-hidden">
      <LiveBackground variant="section" />

      <div className="container relative">
        <AnimatedSection>
          <div className="card p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-maroon/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-semibold mb-6 ${
                  open
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-maroon/20 text-maroon-glow border border-maroon/30'
                }`}
              >
                <Calendar size={14} /> {open ? 'Admissions Open' : 'Admissions Closed'}
              </span>

              <h2 className="section-heading mb-4">
                Join the <span>Legacy</span>
              </h2>
              <p className="text-silver-dim max-w-2xl mx-auto mb-8">{banner}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/admissions" className="btn btn-primary text-sm">
                  {t('nav.applyNow')} <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn btn-ghost text-sm">
                  Contact Admissions
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
