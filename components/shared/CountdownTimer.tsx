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
    return <div className="text-2xl font-display text-maroon-glow">Event has started</div>
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
    <div className="flex gap-4 justify-center">
      {units.map((u) => (
        <div
          key={u.label}
          className="w-16 sm:w-20 aspect-square rounded-xl bg-bg-card border border-maroon/20 flex flex-col items-center justify-center"
        >
          <span className="text-2xl sm:text-3xl font-display text-silver-bright">
            {pad(u.value)}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-silver-dim">{u.label}</span>
        </div>
      ))}
    </div>
  )
}
