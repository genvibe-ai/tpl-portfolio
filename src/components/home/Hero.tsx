import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react'
import { hero, projects, site, ui } from '../../content'
import { useLocalTime } from '../../hooks/useLocalTime'
import { EASE, EASE_IN_OUT } from '../../lib/motion'
import { ButtonLink } from '../ui/Button'
import { useEnterDelay } from '../layout/PageShell'
import { RotatingWord } from './RotatingWord'

const CYCLE_MS = 2800

/** Waits for the web fonts (max ~1s) so the intro never animates fallback type. */
function useFontsReady() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let alive = true
    const fonts = document.fonts?.ready ?? Promise.resolve()
    Promise.race([fonts, new Promise((r) => setTimeout(r, 1000))]).then(() => alive && setReady(true))
    return () => {
      alive = false
    }
  }, [])
  return ready
}

/** The small rounded image set into the headline; it opens between the words, then follows the cycle. */
function ImagePill({ index, tick, delay }: { index: number; tick: number; delay: number }) {
  const reduce = useReducedMotion()
  const project = projects[index % projects.length]
  const next = projects[(index + 1) % projects.length]

  // Warm the cache for the next image so it never flashes in empty.
  useEffect(() => {
    const img = new Image()
    img.src = next.cover.src
  }, [next.cover.src])

  return (
    <motion.span
      aria-hidden="true"
      className="relative inline-block h-[0.72em] -translate-y-[0.05em] overflow-hidden rounded-full bg-surface align-middle"
      initial={reduce ? { width: '1.55em' } : { width: '0em' }}
      animate={{ width: '1.55em' }}
      transition={{ duration: 1.2, ease: EASE_IN_OUT, delay }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={tick}
          src={project.cover.src}
          alt=""
          width={project.cover.width}
          height={project.cover.height}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: project.coverFocus, zIndex: tick }}
          initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.25 }}
          animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
          // The outgoing image stays (zooming gently) until the new one has wiped over it.
          exit={{ scale: 1.12, transition: { duration: 1, ease: EASE_IN_OUT } }}
          transition={{ duration: 0.9, ease: EASE_IN_OUT, delay: 0.1 }}
        />
      </AnimatePresence>
    </motion.span>
  )
}

export function Hero() {
  const enter = useEnterDelay()
  const reduce = useReducedMotion()
  const fontsReady = useFontsReady()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.25 })
  const time = useLocalTime(site.timezone)
  const [cycle, setCycle] = useState({ index: 0, last: -1, tick: 0 })
  const words = hero.words

  // Rotate word + image together while the hero is on screen and the tab is visible.
  useEffect(() => {
    if (reduce || !inView || !fontsReady) return
    const id = window.setInterval(() => {
      if (document.hidden) return
      setCycle(({ index, tick }) => ({ index: (index + 1) % words.length, last: index, tick: tick + 1 }))
    }, CYCLE_MS)
    return () => window.clearInterval(id)
  }, [reduce, inView, fontsReady, words.length])

  const start = enter + 0.15
  const label = hero.lines
    .join(' ')
    .replace('{image}', '')
    .replace('{word}', words[0])
    .replace(/\s+/g, ' ')
    .trim()

  const renderLine = (line: string): ReactNode =>
    line.split(/(\{image\}|\{word\})/).map((part, i) => {
      if (part === '{image}') return <ImagePill key={i} index={cycle.index} tick={cycle.tick} delay={start + 0.35} />
      if (part === '{word}') return <RotatingWord key={i} words={words} index={cycle.index} last={cycle.last} delay={start + 0.45} />
      return <Fragment key={i}>{part}</Fragment>
    })

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: fontsReady ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, ease: EASE, delay },
  })

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col pt-28 md:pt-32">
      <div className="container-page flex flex-1 flex-col justify-center pb-14">
        <motion.div {...fadeUp(start)} className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p className="eyebrow text-muted">{hero.eyebrow}</p>
          {/* The nav shows availability from xl up; below that it lives here. */}
          <p className="flex items-center gap-2.5 text-sm text-muted xl:hidden">
            <span className="live-dot" aria-hidden="true" />
            {site.availability}
          </p>
        </motion.div>

        <h1 id="hero-title" aria-label={label} className="display-hero mt-8 md:mt-10">
          {hero.lines.map((line, i) => (
            <span key={i} className="line-mask">
              <motion.span
                className="block"
                initial={reduce ? false : { y: '108%' }}
                animate={fontsReady ? { y: '0%' } : undefined}
                transition={{ duration: 1.15, ease: EASE, delay: start + 0.05 + i * 0.12 }}
              >
                {renderLine(line)}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-end">
          <motion.div {...fadeUp(start + 0.45)} className="lg:col-span-6 xl:col-span-5">
            <p className="lead max-w-[36rem] text-muted">{hero.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="outline" icon={false}>
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </motion.div>

          <motion.div {...fadeUp(start + 0.55)} className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
            <p className="border-l-2 border-accent pl-4 text-[0.95rem] leading-snug">
              <span className="eyebrow mr-2 text-muted">{hero.currently.label}</span>
              {hero.currently.text}
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t hairline pt-6">
              {hero.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col-reverse justify-end gap-1.5">
                  <dt className="text-[0.8rem] leading-snug text-muted">{fact.label}</dt>
                  <dd className="font-display text-[2.6rem] leading-none tracking-[-0.03em]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>

      <motion.div {...fadeUp(start + 0.7)} className="container-page">
        <div className="flex items-center justify-between gap-6 border-t hairline py-5 text-sm text-muted">
          <ul className="hidden flex-wrap gap-x-5 gap-y-1 md:flex">
            {hero.meta.map((item, i) => (
              <li key={item} className="flex items-center gap-5">
                {i > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-current opacity-50" />}
                {item}
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-2 tabular-nums">
            {site.timezoneLabel} <span className="text-foreground">{time}</span>
          </p>
          <p className="flex items-center gap-3">
            <span className="hidden md:inline">{ui.scroll}</span>
            <span className="scroll-cue" aria-hidden="true" />
          </p>
        </div>
      </motion.div>
    </section>
  )
}
