import type { LucideIcon } from 'lucide-react'
import { Link } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export function IconBox({
  icon: Icon,
  title,
  text,
  href,
  className,
}: {
  icon: LucideIcon
  title: string
  text?: string
  href?: string
  className?: string
}) {
  const content = (
    <>
      <span className="icon-box-icon" aria-hidden>
        <Icon size={22} strokeWidth={1.25} />
      </span>
      <h3 className="icon-box-title">{title}</h3>
      {text && <p className="icon-box-text">{text}</p>}
    </>
  )
  if (href) {
    return (
      <Link href={href} className={cn('icon-box group block', className)}>
        {content}
      </Link>
    )
  }
  return <div className={cn('icon-box', className)}>{content}</div>
}
