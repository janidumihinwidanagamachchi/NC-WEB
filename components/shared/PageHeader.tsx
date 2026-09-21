import { AnimatedSection } from './AnimatedSection'

export function PageHeader({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
}) {
  return (
    <div className="relative py-20 bg-bg-dark border-b border-maroon/10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107,15,26,0.2) 0%, transparent 70%)',
        }}
      />
      <div className="container relative text-center">
        {eyebrow && (
          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-3 text-maroon-glow">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-silver-bright font-display">
          {title} {highlight && <span className="text-maroon-glow">{highlight}</span>}
        </h1>
        {description && (
          <p className="max-w-2xl mx-auto mt-5 text-silver-dim leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  )
}

export function SectionWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <AnimatedSection>
      <section className={`section ${className ?? ''}`}>{children}</section>
    </AnimatedSection>
  )
}
