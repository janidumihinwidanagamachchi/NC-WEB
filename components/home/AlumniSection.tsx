import Image from 'next/image'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { urlFor } from '@/lib/sanity/image'
import type { AlumniAchievement } from '@/types/sanity'

const DEMO: AlumniAchievement[] = [
  {
    _id: 'a1',
    _type: 'alumniAchievement',
    name: 'Bandula Warnapura',
    field: 'Sports',
    achievement: "Sri Lanka's first Test cricket captain and a distinguished Nalandian.",
    batch: 1972,
  },
  {
    _id: 'a2',
    _type: 'alumniAchievement',
    name: 'Dr. Anil Jasinghe',
    field: 'Medicine',
    achievement:
      'Distinguished public health leader and former Director General of Health Services.',
    batch: 1984,
  },
  {
    _id: 'a3',
    _type: 'alumniAchievement',
    name: 'Prof. Ravindra Fernando',
    field: 'Medicine',
    achievement: 'Renowned forensic pathologist and academic.',
    batch: 1969,
  },
]

export function AlumniSection({ alumni }: { alumni?: AlumniAchievement[] }) {
  const items = alumni?.length ? alumni : DEMO

  return (
    <section className="relative section overflow-hidden">
      <LiveBackground variant="section" />

      <div className="container relative">
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-2 text-maroon-glow">
            Distinguished Old Nalandians
          </p>
          <h2 className="section-heading">
            Alumni <span>Spotlight</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((person, i) => (
            <AnimatedSection key={person._id} delay={i * 0.1}>
              <div className="card p-6 text-center h-full">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-bg-mid border border-maroon/20">
                  {person.photo ? (
                    <Image
                      src={urlFor(person.photo).url()}
                      alt={person.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-display text-maroon-glow">
                      {person.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-display text-silver-bright">{person.name}</h3>
                <p className="text-xs text-maroon-glow uppercase tracking-wider mb-3">
                  {person.field} · Batch {person.batch}
                </p>
                <p className="text-sm text-silver-dim leading-relaxed">{person.achievement}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
