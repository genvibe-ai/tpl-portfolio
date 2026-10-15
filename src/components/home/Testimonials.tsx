import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { projects, testimonials, ui } from '../../content'
import { cn, pad } from '../../lib/format'
import { EASE } from '../../lib/motion'
import { Accent } from '../ui/Accent'
import { MaskReveal, Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const AUTOPLAY_MS = 7000

export function Testimonials() {
  const items = testimonials.items
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1])
  const [paused, setPaused] = useState(false)
  const [interacted, setInteracted] = useState(false)
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const playing = !reduce && !paused && inView

  const go = (next: number, dir: number) => setSlide([(next + items.length) % items.length, dir])
  const step = (dir: number) => {
    setInteracted(true)
    go(index + dir, dir)
  }

  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => go(index + 1, 1), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index])

  const item = items[index]
  const project = projects.find((p) => p.slug === item.project)

  return (
    <section
      ref={ref}
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      className="section-pad bg-surface"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false)
      }}
    >
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-10 lg:col-span-4">
          <div>
            <SectionLabel index="05">{testimonials.eyebrow}</SectionLabel>
            <h2 id="testimonials-title" className="display-lg mt-6">
              <MaskReveal>
                <Accent text={testimonials.title} />
              </MaskReveal>
            </h2>
          </div>

          <Reveal delay={0.1} className="flex items-center gap-5">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={ui.previous}
                className="grid size-12 place-items-center rounded-full border border-foreground/25 transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <ArrowLeft className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={ui.next}
                className="grid size-12 place-items-center rounded-full border border-foreground/25 transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <ArrowRight className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1">
              <p className="font-display text-lg tabular-nums" aria-hidden="true">
                <span className="italic text-accent-strong">{pad(index + 1)}</span>
                <span className="text-muted"> / {pad(items.length)}</span>
              </p>
              <div className="mt-2 h-px w-full bg-foreground/15">
                <motion.div
                  key={`${index}-${playing}`}
                  className="h-px origin-left bg-foreground"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: playing ? 1 : 0 }}
                  transition={{ duration: playing ? AUTOPLAY_MS / 1000 : 0.3, ease: 'linear' }}
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div aria-live={interacted ? 'polite' : 'off'} className="relative min-h-[19rem] sm:min-h-[16rem] md:min-h-[17rem]">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.figure
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} / ${items.length}`}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -40 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: EASE }}
              >
                <blockquote className="relative">
                  <span aria-hidden="true" className="absolute -top-6 -left-1 font-display text-[6rem] leading-none text-accent md:-left-12 md:-top-8">
                    “
                  </span>
                  <p className="font-display text-[clamp(1.6rem,3vw,2.7rem)] leading-[1.18] tracking-[-0.015em]">{item.quote}</p>
                </blockquote>
                <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <span className="flex items-center gap-4">
                    <img
                      src={item.avatar.src}
                      alt=""
                      width={item.avatar.width}
                      height={item.avatar.height}
                      loading="lazy"
                      className="size-14 rounded-full object-cover"
                    />
                    <span>
                      <span className="block font-semibold">{item.name}</span>
                      <span className="block text-sm text-muted">{item.role}</span>
                    </span>
                  </span>
                  {project && (
                    <Link
                      to={`/work/${project.slug}`}
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong"
                    >
                      <span className="link-draw">{ui.readCase}</span>
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Faces as tabs: jump straight to any client. */}
          <div className="mt-12 flex flex-wrap gap-3 border-t hairline pt-8">
            {items.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => {
                  setInteracted(true)
                  go(i, i > index ? 1 : -1)
                }}
                aria-label={t.name}
                aria-current={i === index ? 'true' : undefined}
                className={cn(
                  'rounded-full p-0.5 ring-1 transition-all duration-300',
                  i === index ? 'ring-accent' : 'opacity-55 ring-transparent grayscale hover:opacity-100 hover:grayscale-0',
                )}
              >
                <img src={t.avatar.src} alt="" width={t.avatar.width} height={t.avatar.height} loading="lazy" className="size-11 rounded-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
