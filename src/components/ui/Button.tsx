import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/format'
import { SmartLink } from './SmartLink'

const variants = {
  /** Ink pill; turns vermilion on hover. */
  primary: 'bg-foreground text-background hover:bg-accent hover:text-accent-foreground',
  /** Vermilion pill (works on paper and on the dark bands). */
  accent: 'bg-accent text-accent-foreground hover:bg-inverse-foreground hover:text-inverse',
  /** Hairline outline on paper. */
  outline: 'border border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground hover:text-background',
  /** Hairline outline on the dark bands. */
  'outline-inverse':
    'border border-inverse-foreground/30 text-inverse-foreground hover:border-inverse-foreground hover:bg-inverse-foreground hover:text-inverse',
} as const

export type ButtonVariant = keyof typeof variants

export function buttonClasses(variant: ButtonVariant = 'primary', size: 'md' | 'sm' = 'md') {
  return cn(
    'group inline-flex items-center justify-center gap-3 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color] duration-300',
    size === 'md' ? 'h-13 px-6 text-[0.95rem]' : 'h-10 px-4.5 text-sm',
    variants[variant],
  )
}

/** The label rolls up to a copy of itself on hover (the copy is hidden from screen readers). */
export function RollLabel({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  )
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon = true,
  className,
  onClick,
}: {
  href: string
  children: ReactNode
  variant?: ButtonVariant
  size?: 'md' | 'sm'
  icon?: boolean
  className?: string
  onClick?: () => void
}) {
  return (
    <SmartLink href={href} className={cn(buttonClasses(variant, size), className)} onClick={onClick}>
      <RollLabel>{children}</RollLabel>
      {icon && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-1 group-hover:-rotate-45"
          strokeWidth={1.75}
        />
      )}
    </SmartLink>
  )
}
