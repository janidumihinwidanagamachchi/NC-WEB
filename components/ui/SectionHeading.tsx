import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  lead?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={cn('mb-12 max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="section-heading mt-4">{title}</h2>
      {lead && <p className="mt-5 text-body">{lead}</p>}
    </div>
  )
}
