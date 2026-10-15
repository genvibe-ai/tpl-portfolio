import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/format'
import { EASE } from '../../lib/motion'

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number }

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ delay = 0, y = 28, transition, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease: EASE, delay, ...transition }}
      {...props}
    />
  )
}

/**
 * Display type that rises out of its own mask when it scrolls into view.
 * Put it inside a heading: <h2 className="display-lg"><MaskReveal>…</MaskReveal></h2>
 * (The mask is what gets observed: an element hidden by its parent's overflow never counts as "in view".)
 */
export function MaskReveal({
  children,
  delay = 0,
  className,
  immediate = false,
}: {
  children: ReactNode
  delay?: number
  className?: string
  /** Animate on mount instead of on scroll (for page headers). */
  immediate?: boolean
}) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      className={cn('line-mask', className)}
      initial={reduce ? false : 'hidden'}
      {...(immediate ? { animate: 'shown' } : { whileInView: 'shown', viewport: { once: true, margin: '0px 0px -8% 0px' } })}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: '108%' }, shown: { y: '0%', transition: { duration: 1.1, ease: EASE, delay } } }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

/** An image frame that opens from its center and settles from a slight zoom when it scrolls into view. */
export function RevealFrame({
  children,
  className,
  delay = 0,
  immediate = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  immediate?: boolean
}) {
  const reduce = useReducedMotion()
  const shown = { clipPath: 'inset(0% 0% 0% 0%)' }
  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial={reduce ? false : { clipPath: 'inset(9% 7% 9% 7%)' }}
      {...(immediate ? { animate: shown } : { whileInView: shown, viewport: { once: true, margin: '0px 0px -12% 0px' } })}
      transition={{ duration: 1.3, ease: EASE, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.14 }}
        {...(immediate ? { animate: { scale: 1 } } : { whileInView: { scale: 1 }, viewport: { once: true, margin: '0px 0px -12% 0px' } })}
        transition={{ duration: 1.6, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
