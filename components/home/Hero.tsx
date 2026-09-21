import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden border-b border-line">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 62% 55% at 50% 42%, rgba(107,15,26,0.32) 0%, rgba(107,15,26,0.12) 42%, transparent 72%), #151515',
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              'repeating-linear-gradient(-45deg, #fff 0 2px, transparent 2px 26px), repeating-linear-gradient(45deg, #fff 0 2px, transparent 2px 26px)',
          }}
        />
      </div>

      <div className="container relative py-28 text-center">
        <Eyebrow className="justify-center">Colombo · Since 1924</Eyebrow>

        <h1 className="mx-auto mt-8 max-w-4xl font-display leading-[1.02]">
          <span className="block text-2xl font-normal tracking-normal text-heading md:text-3xl">
            with
          </span>
          <span className="mt-2 block text-[clamp(3.2rem,10vw,7.2rem)] text-heading">wisdom</span>
          <span className="block text-[clamp(3.2rem,10vw,7.2rem)] text-gold">character</span>
          <span className="mt-3 block text-2xl font-normal text-heading md:text-3xl">
            illuminates since 1924
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-body">
          Nurturing excellence, wisdom and character — Colombo&apos;s premier Buddhist national
          school shaping leaders for a century.
        </p>

        <div className="mt-12">
          <Button href="/about" variant="outline" size="lg">
            Discover Nalanda
          </Button>
        </div>
      </div>
    </section>
  )
}
