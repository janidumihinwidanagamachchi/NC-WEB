import { ArrowRight, GraduationCap, PhoneCall } from 'lucide-react'
import { Link } from '@/lib/navigation'

const TILES = [
  {
    href: '/admissions',
    icon: GraduationCap,
    title: 'Apply Now',
    caption: 'Begin your journey at Nalanda',
  },
  {
    href: '/contact',
    icon: PhoneCall,
    title: 'Contact Us',
    caption: 'Write to us — we reply quickly',
  },
]

export function QuickTiles() {
  return (
    <section className="border-b border-line" aria-label="Quick actions">
      <div className="container grid md:grid-cols-2">
        {TILES.map((tile, i) => (
          <Link
            key={tile.href}
            href={tile.href}
            className={`group flex items-center justify-between gap-6 px-2 py-8 transition-colors hover:bg-bg-panel ${
              i === 0 ? 'md:border-r md:border-line' : ''
            } border-b border-line md:border-b-0`}
          >
            <span className="flex items-center gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-line-warm text-gold transition-colors group-hover:border-gold">
                <tile.icon size={26} strokeWidth={1.25} />
              </span>
              <span>
                <span className="block font-display text-2xl text-heading transition-colors group-hover:text-gold-light">
                  {tile.title}
                </span>
                <span className="mt-0.5 block text-sm text-dim">{tile.caption}</span>
              </span>
            </span>
            <ArrowRight
              size={20}
              className="shrink-0 text-dim transition-all group-hover:translate-x-1 group-hover:text-gold"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
