import { cn } from '@/lib/utils'

export function Placeholder({ label, className }: { label?: string; className?: string }) {
  return (
    <div
      className={cn('placeholder', className)}
      role="img"
      aria-label={label ?? 'Image placeholder'}
    >
      <span>{label ?? 'Nalanda College'}</span>
    </div>
  )
}
