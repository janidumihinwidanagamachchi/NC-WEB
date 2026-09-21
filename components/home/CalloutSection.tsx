import { Calendar, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import type { SiteSettings } from '@/types/sanity'

export function CalloutSection({ settings }: { settings?: SiteSettings | null }) {
  const open = settings?.admissionsOpen ?? false
  const banner =
    settings?.admissionsBanner ?? 'Applications for the 2027 academic year are now open.'

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="relative border border-line px-8 py-16 text-center md:px-16">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 60% 90% at 50% 0%, rgba(107,15,26,0.22) 0%, transparent 70%)',
              }}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 border border-line-warm px-3 py-1 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">
                <Calendar size={13} /> {open ? 'Admissions Open' : 'Admissions Closed'}
              </span>

              <span className="mx-auto mt-8 flex h-16 w-16 items-center justify-center border border-line-warm text-gold">
                <GraduationCap size={28} strokeWidth={1.25} />
              </span>

              <h2 className="section-heading mt-8">
                Join the <span>Legacy</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-body">{banner}</p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/admissions" variant="solid" size="lg">
                  Apply Now
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Contact Admissions
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
