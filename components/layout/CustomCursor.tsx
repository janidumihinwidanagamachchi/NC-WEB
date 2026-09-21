'use client'

import { useEffect, useRef, useState } from 'react'

function getCursorEnabled() {
  if (typeof window === 'undefined') return false
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches
  return !reduced && !coarse
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(() => getCursorEnabled())

  useEffect(() => {
    const onChange = () => setEnabled(getCursorEnabled())
    const mql1 = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mql2 = window.matchMedia('(hover: none) and (pointer: coarse)')
    mql1.addEventListener('change', onChange)
    mql2.addEventListener('change', onChange)
    return () => {
      mql1.removeEventListener('change', onChange)
      mql2.removeEventListener('change', onChange)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let raf = 0
    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    const onEnter = () => ring.classList.add('hovering')
    const onLeave = () => ring.classList.remove('hovering')

    const animate = () => {
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    document
      .querySelectorAll('a, button, [role="button"], input, textarea, select')
      .forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
