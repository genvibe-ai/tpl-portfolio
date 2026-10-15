import { Fragment } from 'react'
import { cn } from '../../lib/format'

const tones = {
  accent: 'text-accent',
  strong: 'text-accent-strong',
  inherit: '',
} as const

/**
 * Renders content text, turning *wrapped words* into the italic serif accent.
 * "An identity cut from *a single curve*" → An identity cut from <em>a single curve</em>
 * tone: "accent" (vermilion, for large type), "strong" (deeper, for small text), "inherit" (italic only).
 */
export function Accent({ text, tone = 'accent', className }: { text: string; tone?: keyof typeof tones; className?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean)
  return (
    <>
      {parts.map((part, i) =>
        part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
          <em key={i} className={cn('accent-italic', tones[tone], className)}>
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
