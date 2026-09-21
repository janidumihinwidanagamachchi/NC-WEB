'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { label: 'Years of Excellence', value: 100, suffix: '+' },
  { label: 'Students Enrolled', value: 5200, suffix: '' },
  { label: 'A/L Subject Streams', value: 3, suffix: '' },
  { label: 'National Champions', value: 48, suffix: '×' },
  { label: 'Distinguished Alumni', value: 10000, suffix: '+' },
]

export function StatsBanner() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const counters = ref.current?.querySelectorAll('[data-count]')
    counters?.forEach((el) => {
      const target = Number(el.getAttribute('data-count'))
      const start = performance.now()
      const duration = 2500

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
        { threshold: 0.5 }
      )

      observer.observe(el)
    })
  }, [])

  return (
    <div ref={ref} className="bg-maroon py-16">
      <div className="container grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="text-4xl md:text-5xl font-bold text-silver-bright">
              <span data-count={s.value}>0</span>
              {s.suffix}
            </div>
            <p className="text-maroon-100 text-sm mt-2 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
