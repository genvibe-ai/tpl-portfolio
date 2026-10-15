import { useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { useFinePointer } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/format'

const REST = 400
const MIN = 260
const MAX = 800

/**
 * The giant footer name. With a mouse, each letter gains weight as the pointer nears it
 * (Newsreader is a variable font, so any weight between 200 and 800 renders).
 * On touch screens a single weight wave runs when it scrolls into view. Reduced motion: static.
 */
export function Wordmark({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const letters = useRef<HTMLSpanElement[]>([])
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const interactive = fine && !reduce

  const onMove = (e: React.PointerEvent) => {
    if (!interactive) return
    const radius = Math.max(window.innerWidth * 0.16, 140)
    for (const el of letters.current) {
      if (!el) continue
      const r = el.getBoundingClientRect()
      const d = Math.abs(e.clientX - (r.left + r.width / 2))
      const t = Math.max(0, 1 - d / radius)
      el.style.fontWeight = String(Math.round(MIN + (MAX - MIN) * t * t * (3 - 2 * t)))
    }
  }

  const onLeave = () => {
    for (const el of letters.current) if (el) el.style.fontWeight = String(REST)
  }

  return (
    <p
      ref={ref}
      aria-label={text}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn('select-none whitespace-nowrap', !fine && !reduce && inView && 'weight-wave', className)}
    >
      {[...text].map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          ref={(el) => {
            if (el) letters.current[i] = el
          }}
          className="weight-letter"
          style={{ '--i': i } as React.CSSProperties}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </p>
  )
}
