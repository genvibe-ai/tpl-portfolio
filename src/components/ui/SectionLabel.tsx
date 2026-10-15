import type { ReactNode } from 'react'
import { cn } from '../../lib/format'

/** "(02) —— Selected work": the small index label above section titles. Use as="h2" when it is the section's heading. */
export function SectionLabel({
  index,
  children,
  inverse = false,
  className,
  as: Tag = 'p',
  id,
}: {
  index?: string
  children: ReactNode
  inverse?: boolean
  className?: string
  as?: 'p' | 'h2' | 'h3' | 'div'
  id?: string
}) {
  return (
    <Tag id={id} className={cn('eyebrow flex items-center gap-3', inverse ? 'text-inverse-muted' : 'text-muted', className)}>
      {index && (
        <span className={cn('font-display text-[0.95rem] font-normal italic normal-case tracking-normal', inverse ? 'text-accent' : 'text-accent-strong')}>
          ({index})
        </span>
      )}
      <span aria-hidden="true" className="h-px w-7 bg-current opacity-50" />
      <span>{children}</span>
    </Tag>
  )
}
