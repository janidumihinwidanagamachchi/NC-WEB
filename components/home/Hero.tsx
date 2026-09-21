import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'

const HERO_BG = 'https://picsum.photos/seed/nalanda-hero/1600/900'

export function Hero() {
  return (
    <section
      className="section-hero section--bg relative overflow-hidden border-b border-line"
      style={{ backgroundImage: `url(${HERO_BG})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 62% 55% at 50% 42%, rgba(107,15,26,0.32) 0%, rgba(107,15,26,0.12) 42%, transparent 72%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              'repeating-linear-gradient(-45deg, #fff 0 2px, transparent 2px 26px), repeating-linear-gradient(45deg, #fff 0 2px, transparent 2px 26px)',
          }}
        />
      </div>

      <div className="container relative z-10 text-center">
        <Eyebrow className="justify-center">Colombo · Since 1924</Eyebrow>

        <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl leading-[1.1] text-heading sm:text-5xl md:text-6xl">
          Wisdom <span className="text-gold">illuminates</span> character
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-body">
          Nurturing excellence, wisdom and character — Colombo&apos;s premier Buddhist national
          school shaping leaders for a century.
        </p>

        <div className="mt-10">
          <Button href="/about" variant="outline" size="lg">
            Discover Nalanda
          </Button>
        </div>
      </div>
    </section>
  )
}
