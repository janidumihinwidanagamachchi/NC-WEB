import { Link } from '@/lib/navigation'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { Trophy, ArrowRight } from 'lucide-react'

export async function BattleOfMaroons() {
  return (
    <section className="relative section overflow-hidden">
      <LiveBackground variant="section" />

      <div className="container relative">
        <AnimatedSection className="card p-8 md:p-12 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-maroon/20 to-transparent pointer-events-none" />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon/20 border border-maroon/30 text-maroon-glow text-xs uppercase tracking-wider font-semibold mb-6">
                <Trophy size={14} /> The Big Match
              </div>
              <h2 className="section-heading mb-4">
                Battle of the <span>Maroons</span>
              </h2>
              <p className="text-silver-dim leading-relaxed mb-6">
                The 95th Battle of the Maroons stands as the longest-running school cricket rivalry
                in Sri Lanka. Nalanda College vs Dharmaraja College — a clash of tradition, talent,
                and unyielding school spirit that unites generations of Nalandians.
              </p>
              <Link href="/sports" className="btn btn-primary text-sm">
                Relive the Rivalry <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-bg-mid border border-maroon/20 text-center">
                <div className="text-4xl font-display text-maroon-glow">95</div>
                <div className="text-xs uppercase tracking-wider text-silver-dim mt-1">
                  Encounters
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-bg-mid border border-maroon/20 text-center">
                <div className="text-4xl font-display text-silver-bright">1928</div>
                <div className="text-xs uppercase tracking-wider text-silver-dim mt-1">
                  First Match
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-bg-mid border border-maroon/20 text-center col-span-2">
                <div className="text-3xl font-display text-maroon-glow">Sinhalese Sports Club</div>
                <div className="text-xs uppercase tracking-wider text-silver-dim mt-1">
                  Home Ground
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
