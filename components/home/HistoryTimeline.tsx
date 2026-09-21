import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { LiveBackground } from '@/components/shared/LiveBackground'

const MILESTONES = [
  {
    year: 1924,
    title: 'Foundation',
    description: 'Nalanda College was established by a group of Buddhist leaders in Colombo.',
  },
  {
    year: 1940,
    title: 'First A/L Batch',
    description: 'The school expanded to include Advanced Level classes.',
  },
  {
    year: 1956,
    title: 'National School Status',
    description: 'Gazetted as a National School of Sri Lanka.',
  },
  {
    year: 1968,
    title: 'First Cricket Championship',
    description: 'Won the Colombo Schools Cricket League for the first time.',
  },
  {
    year: 2000,
    title: 'Technology Upgrade',
    description: 'Introduced computer laboratories and ICT infrastructure.',
  },
  {
    year: 2024,
    title: 'Centenary',
    description: 'Celebrated 100 years of academic and cultural excellence.',
  },
]

export function HistoryTimeline() {
  return (
    <section className="relative section overflow-hidden">
      <LiveBackground variant="section" />

      <div className="container relative">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-2 text-maroon-glow">
            Our Legacy
          </p>
          <h2 className="section-heading">
            A Century of <span>Excellence</span>
          </h2>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-maroon/30 -translate-x-1/2" />

          {MILESTONES.map((m, i) => (
            <AnimatedSection key={m.year} delay={i * 0.1}>
              <div
                className={`relative flex items-center mb-12 ${
                  i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-5/12 ${i % 2 === 0 ? 'text-right pr-10' : 'text-left pl-10'}`}>
                  <span className="text-maroon-glow font-mono text-2xl font-bold">{m.year}</span>
                  <h3 className="text-white text-xl font-semibold mt-1 font-display">{m.title}</h3>
                  <p className="text-silver-dim text-sm mt-2">{m.description}</p>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-maroon-glow border-2 border-bg-deep z-10" />

                <div className="w-5/12" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
