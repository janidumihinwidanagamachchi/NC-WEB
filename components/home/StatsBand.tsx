'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { label: 'Years of Excellence', value: 100, suffix: '+' },
  { label: 'Students Enrolled', value: 5200, suffix: '' },
  { label: 'A/L Subject Streams', value: 3, suffix: '' },
  { label: 'National Champions', value: 48, suffix: '×' },
  { label: 'Distinguished Alumni', value: 10000, suffix: '+' },
]

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const counters = ref.current?.querySelectorAll('[data-count]')
    counters?.forEach((el) => {
      const target = Number(el.getAttribute('data-count'))
      const start = performance.now()
      const duration = 2000

      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const current = Math.round(easeOutQuart(progress) * target)
        el.textContent = current.toLocaleString()
        if (progress < 1) requestAnimationFrame(step)
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              requestAnimationFrame(step)
              observer.unobserve(el)
            }
          })
        },
        { threshold: 0.4 }
      )

      observer.observe(el)
    })
  }, [])

  return (
    <section ref={ref} className="section">
      <div className="container grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-5">
        {STATS.map((s) => (
          <div key={s.label} className="bg-bg p-8 transition-colors hover:bg-bg-panel">
            <div className="stat-number">
              <span data-count={s.value}>0</span>
              {s.suffix}
            </div>
            <p className="mt-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-dim">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
