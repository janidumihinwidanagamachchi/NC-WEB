import Image from 'next/image'
import type { ReactNode } from 'react'
import { Link } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { Placeholder } from './Placeholder'

export function BannerCard({
  image,
  title,
  meta,
  caption,
  href,
  placeholderLabel,
  className,
}: {
  image?: string | null
  title: string
  meta?: string
  caption?: string
  href: string
  placeholderLabel?: string
  className?: string
}) {
  return (
    <Link href={href} className={cn('banner-card group', className)}>
      <div className="banner-card-media">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <Placeholder label={placeholderLabel ?? title} className="min-h-[220px]" />
        )}
      </div>
      <div className="banner-card-caption">
        <h3 className="text-xl text-heading">{title}</h3>
        {meta && <p className="mt-1 text-sm text-gold">{meta}</p>}
        {caption && <p className="mt-2 text-sm text-dim leading-relaxed">{caption}</p>}
        <span className="sr-only">Open</span>
      </div>
    </Link>
  )
}

export function BannerCardWrap({ children }: { children: ReactNode }) {
  return children
}
