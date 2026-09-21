import { Button } from '@/components/ui/Button'

export function CtaStrip() {
  return (
    <section className="bg-bg-panel">
      <div className="container flex flex-col items-center justify-between gap-6 py-14 md:flex-row">
        <p className="text-center font-display text-2xl text-heading md:text-left md:text-3xl">
          Haven&apos;t found what you&apos;re looking for?{' '}
          <span className="text-gold">Write to us!</span>
        </p>
        <Button href="/contact" variant="outline" className="shrink-0">
          Contact Us
        </Button>
      </div>
    </section>
  )
}
