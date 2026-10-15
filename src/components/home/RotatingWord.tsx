import { motion, useReducedMotion } from 'motion/react'
import { EASE, EASE_IN } from '../../lib/motion'

const BELOW = '140%'
const ABOVE = '-140%'

/**
 * The hero's italic word. Every word sits in the same grid cell, so the line never reflows.
 * On each change the old word's letters roll up out of their mask and the new word's letters
 * roll in from below, one after another. `last` is the word that is leaving (-1 for none).
 */
export function RotatingWord({ words, index, last, delay = 0 }: { words: string[]; index: number; last: number; delay?: number }) {
  const reduce = useReducedMotion()

  return (
    <span className="relative inline-grid align-baseline">
      {words.map((word, w) => {
        const state = w === index ? 'in' : w === last ? 'out' : 'idle'
        // The very first word waits for the hero lines to rise; later words start as the old one leaves.
        const wait = last === -1 ? delay : 0.12
        return (
          <span
            key={word}
            aria-hidden="true"
            className="col-start-1 row-start-1 -mt-[0.14em] -mr-[0.24em] -mb-[0.22em] overflow-hidden pt-[0.14em] pr-[0.24em] pb-[0.22em] whitespace-nowrap"
          >
            {[...word].map((char, i) => (
              <motion.span
                key={i}
                className="accent-italic inline-block p-0 text-accent"
                initial={{ y: w === index && reduce ? '0%' : BELOW }}
                animate={state}
                variants={{
                  in: {
                    y: reduce ? '0%' : [BELOW, '0%'],
                    transition: { duration: 0.9, ease: EASE, delay: wait + i * 0.03 },
                  },
                  out: { y: ABOVE, transition: { duration: 0.45, ease: EASE_IN, delay: i * 0.02 } },
                  // Parked above the mask. Must be explicit and instant: an empty variant would
                  // animate the letters back to `initial` and drag them through the line.
                  idle: { y: ABOVE, transition: { duration: 0 } },
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        )
      })}
    </span>
  )
}
