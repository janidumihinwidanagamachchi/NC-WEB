'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { LiveBackground } from '@/components/shared/LiveBackground'
import { Link } from '@/lib/navigation'

const CollegeCrestGL = dynamic(() => import('./CollegeCrestGL').then((m) => m.CollegeCrestGL), {
  ssr: false,
  loading: () => <div className="w-full h-full animate-pulse" />,
})

export function HeroParallax() {
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollHint = useRef<HTMLDivElement>(null)
  const ring1Ref = useRef<HTMLDivElement>(null)
  const ring2Ref = useRef<HTMLDivElement>(null)
  const t = useTranslations()

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      requestAnimationFrame(() => {
        const y = window.scrollY
        const progress = Math.min(y / (window.innerHeight * 0.8), 1)
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${y * 0.22}px)`
          contentRef.current.style.opacity = String(1 - progress * 1.4)
        }
        if (scrollHint.current) scrollHint.current.style.opacity = String(1 - progress * 5)
        if (ring1Ref.current) ring1Ref.current.style.transform = `rotate(${y * 0.05}deg)`
        if (ring2Ref.current) ring2Ref.current.style.transform = `rotate(${-y * 0.03}deg)`
        ticking = false
      })
      ticking = true
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      className="relative h-screen min-h-[640px] overflow-hidden flex items-center justify-center"
      aria-label="Hero"
    >
      <LiveBackground variant="hero" />

      {/* Decorative rings */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          ref={ring1Ref}
          className="absolute w-[700px] h-[700px] rounded-full will-change-transform border border-maroon/15"
        />
        <div
          ref={ring2Ref}
          className="absolute w-[500px] h-[500px] rounded-full will-change-transform border border-dashed border-silver/5"
        />
        <div className="absolute w-[300px] h-[300px] rounded-full animate-spin-slow border border-maroon/10" />
      </div>

      {/* 3D crest */}
      <div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 pointer-events-none"
        aria-hidden="true"
      >
        <CollegeCrestGL />
      </div>

      {/* CSS crest overlay */}
      <div
        className="absolute top-[10%] left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden="true"
      >
        <div className="relative w-32 h-32 animate-float">
          <div className="absolute inset-0 rounded-full animate-pulse-maroon border border-maroon/50" />
          <div className="absolute inset-3 rounded-full border border-silver/10" />
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-0.5">
            <span
              className="text-3xl font-bold select-none leading-none font-display text-maroon-bright"
              style={{ textShadow: '0 0 30px rgba(212,43,69,0.6)' }}
            >
              NC
            </span>
            <span className="text-[8px] tracking-[0.3em] uppercase text-silver/40">1924</span>
          </div>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 h-px origin-left"
              style={{
                width: '64px',
                marginTop: '-0.5px',
                background: `rgba(${i % 3 === 0 ? '139,21,37' : '184,184,204'},${
                  i % 3 === 0 ? '0.2' : '0.06'
                })`,
                transform: `rotate(${i * 30}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 max-w-4xl will-change-transform mt-24"
      >
        <div className="inline-flex items-center gap-2.5 mb-7 px-5 py-2 rounded-full bg-maroon/15 border border-maroon/40 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-maroon-glow inline-block animate-pulse" />
          <span className="text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-rose-100/80">
            Established 1924 · Colombo, Sri Lanka
          </span>
        </div>

        <h1 className="leading-[1.02] mb-4 font-display">
          <span className="block text-5xl sm:text-7xl md:text-8xl font-bold text-silver-bright tracking-tight">
            Nalanda
          </span>
          <span className="block text-5xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-br from-maroon-bright via-maroon-glow to-silver bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(212,43,69,0.4)]">
            College
          </span>
        </h1>

        <p className="text-xl sm:text-2xl mb-2 font-serif italic text-silver/50">
          නාලන්දා විද්‍යාලය · Colombo
        </p>

        <div className="flex items-center justify-center gap-3 my-6">
          <div className="flex-1 max-w-[80px] h-px bg-gradient-to-r from-transparent to-maroon/50" />
          <p className="text-xs sm:text-sm tracking-[0.22em] uppercase font-semibold text-maroon-glow/80">
            Wisdom Illuminates Character
          </p>
          <div className="flex-1 max-w-[80px] h-px bg-gradient-to-l from-transparent to-maroon/50" />
        </div>

        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-silver/45">
          A century of nurturing noble sons endowed with virtues and wisdom. Shaping Sri
          Lanka&apos;s finest minds since 1924.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/about" className="btn btn-primary text-sm px-8">
            {t('common.discover')}
          </Link>
          <Link href="/admissions" className="btn btn-ghost text-sm px-8">
            {t('nav.applyNow')}
          </Link>
        </div>
      </div>

      <div
        ref={scrollHint}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-300"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-silver/25">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-maroon/60 to-transparent animate-[scroll-hint_1.6s_ease-in-out_infinite]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-bg-deep to-transparent" />
    </section>
  )
}
