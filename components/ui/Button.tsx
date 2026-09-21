import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from '@/lib/navigation'
import { cn } from '@/lib/utils'

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: 'outline' | 'solid' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  arrow?: boolean
  className?: string
  external?: boolean
}

const sizeClass: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
}

export function Button({
  href,
  children,
  variant = 'outline',
  size = 'md',
  arrow = true,
  className,
  external = false,
}: ButtonProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('btn', `btn-${variant}`, sizeClass[size], className)}
      >
        {children}
        {arrow && <ArrowRight size={16} strokeWidth={1.5} aria-hidden />}
      </a>
    )
  }
  return (
    <Link href={href} className={cn('btn', `btn-${variant}`, sizeClass[size], className)}>
      {children}
      {arrow && <ArrowRight size={16} strokeWidth={1.5} aria-hidden />}
    </Link>
  )
}
