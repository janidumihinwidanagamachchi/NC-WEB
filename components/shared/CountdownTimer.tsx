'use client'

import { useEffect, useState } from 'react'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export function CountdownTimer({ target }: { target: string | Date }) {
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!now) return <div className="h-20" suppressHydrationWarning />

  const diff = new Date(target).getTime() - now.getTime()
  if (diff <= 0) {
    return <div className="font-display text-2xl text-gold">Event has started</div>
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]

  return (
    <div className="flex justify-center gap-3">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex w-16 flex-col items-center justify-center border border-line bg-bg-panel py-4 sm:w-20"
        >
          <span className="font-display text-2xl text-gold sm:text-3xl">{pad(u.value)}</span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-dim">{u.label}</span>
        </div>
      ))}
    </div>
  )
}
