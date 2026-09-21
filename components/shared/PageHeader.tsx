import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'

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
    <div className="relative pb-16 pt-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% -10%, rgba(107,15,26,0.28) 0%, transparent 68%)',
        }}
      />
      <div className="container relative text-center">
        {eyebrow && (
          <Reveal>
            <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={0.06}>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl">
            {title} {highlight && <span className="text-gold">{highlight}</span>}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-body">{description}</p>
          </Reveal>
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
  return <section className={cn('section', className)}>{children}</section>
}
