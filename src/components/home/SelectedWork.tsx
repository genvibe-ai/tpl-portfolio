import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion, useMotionValue, useSpring, type MotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { projects, ui, work, type Project } from '../../content'
import { useFinePointer } from '../../hooks/useMediaQuery'
import { cn, pad, plain } from '../../lib/format'
import { EASE, EASE_IN_OUT } from '../../lib/motion'
import { Accent } from '../ui/Accent'
import { MaskReveal, Reveal, RevealFrame } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

type View = 'grid' | 'index'
const STORAGE_KEY = 'portfolio-work-view'

/** Editorial rhythm for the grid (repeats every four projects): two staggered columns on tablets, asymmetric from lg up. */
const LAYOUT = [
  { cell: 'md:col-span-6 lg:col-span-7', frame: 'aspect-[3/2]' },
  { cell: 'md:col-span-6 md:mt-20 lg:col-span-4 lg:col-start-9 lg:mt-32', frame: 'aspect-[4/5]' },
  { cell: 'md:col-span-6 lg:col-span-4 lg:col-start-2', frame: 'aspect-[4/5]' },
  { cell: 'md:col-span-6 md:mt-20 lg:col-span-6 lg:col-start-7 lg:mt-24', frame: 'aspect-[3/2]' },
]

const href = (p: Project) => `/work/${p.slug}`

function readView(): View {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'index' ? 'index' : 'grid'
  } catch {
    return 'grid'
  }
}

export function SelectedWork() {
  const [view, setView] = useState<View>(readView)

  const choose = (next: View) => {
    setView(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* private mode: keep it for this visit only */
    }
  }

  return (
    <section id="work" aria-labelledby="work-title" className="section-pad">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="01">{work.eyebrow}</SectionLabel>
            <h2 id="work-title" className="display-xl mt-6">
              <MaskReveal>
                <Accent text={work.title} />
              </MaskReveal>
            </h2>
          </div>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <p className="text-muted">{work.intro}</p>
            <div role="group" aria-label={ui.workViews} className="mt-6 inline-flex rounded-full border hairline p-1">
              {(['grid', 'index'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={view === option}
                  onClick={() => choose(option)}
                  className={cn(
                    'relative h-9 rounded-full px-5 text-sm font-semibold transition-colors duration-300',
                    view === option ? 'text-background' : 'text-muted hover:text-foreground',
                  )}
                >
                  {view === option && (
                    <motion.span
                      layoutId="work-view"
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  <span className="relative">{option === 'grid' ? ui.gridView : ui.indexView}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {view === 'grid' ? <WorkGrid /> : <WorkIndex />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ── Grid view ────────────────────────────────────────────────────────── */

function WorkGrid() {
  return (
    <ul className="mt-16 grid gap-x-6 gap-y-16 md:mt-24 md:grid-cols-12 md:gap-y-20">
      {projects.map((project, i) => (
        <WorkCard key={project.slug} project={project} index={i} layout={LAYOUT[i % LAYOUT.length]} />
      ))}
    </ul>
  )
}

function WorkCard({ project, index, layout }: { project: Project; index: number; layout: (typeof LAYOUT)[number] }) {
  const fine = useFinePointer()
  const frameRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 })

  const track = (e: React.PointerEvent, jump = false) => {
    const r = frameRef.current?.getBoundingClientRect()
    if (!r) return
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
    if (jump) {
      // Start the badge under the pointer instead of flying in from its last spot.
      sx.jump(e.clientX - r.left)
      sy.jump(e.clientY - r.top)
    }
  }

  return (
    <li className={layout.cell}>
      <Link
        to={href(project)}
        className="group block focus-visible:outline-none"
        onPointerEnter={(e) => {
          track(e, true)
          setHover(true)
        }}
        onPointerMove={track}
        onPointerLeave={() => setHover(false)}
      >
        <div ref={frameRef} className={cn('relative bg-surface', fine && 'cursor-none', layout.frame)}>
          <RevealFrame className="absolute inset-0">
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              loading={index < 2 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.07]"
              style={{ objectPosition: project.coverFocus }}
            />
          </RevealFrame>
          {/* Keyboard focus ring sits on the frame. */}
          <span className="pointer-events-none absolute inset-0 group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-accent-strong" />
          {fine && (
            <motion.span className="pointer-events-none absolute top-0 left-0 z-10" style={{ x: sx, y: sy }} aria-hidden="true">
              <motion.span
                className="grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-center text-[0.78rem] leading-tight font-semibold text-accent-foreground"
                initial={false}
                animate={{ scale: hover ? 1 : 0.2, opacity: hover ? 1 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <span className="flex flex-col items-center gap-1">
                  <ArrowUpRight className="size-4" strokeWidth={2} />
                  {ui.viewCase}
                </span>
              </motion.span>
            </motion.span>
          )}
        </div>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="eyebrow text-muted">
              <span className="text-accent-strong">{pad(index + 1)}</span>
              <span className="mx-2 opacity-50">/</span>
              {project.discipline}
            </p>
            <h3 className="mt-3 flex items-center gap-2 font-display text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.05] tracking-[-0.02em]">
              {project.client}
              <ArrowUpRight
                aria-hidden="true"
                className="size-6 shrink-0 -translate-x-2 text-accent opacity-0 transition-all duration-500 ease-editorial group-hover:translate-x-0 group-hover:opacity-100"
                strokeWidth={1.5}
              />
            </h3>
            <p className="mt-2 max-w-[34ch] text-[0.95rem] text-muted">
              <Accent text={project.title} tone="inherit" />
            </p>
          </div>
          <p className="shrink-0 pt-0.5 text-sm text-muted tabular-nums">{project.year}</p>
        </div>
      </Link>
    </li>
  )
}

/* ── Index view ───────────────────────────────────────────────────────── */

function WorkIndex() {
  const fine = useFinePointer()
  const [active, setActive] = useState<number | null>(null)
  const [tick, setTick] = useState(0)
  const activeRef = useRef<number | null>(null)
  const [inside, setInside] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 })

  const activate = (i: number | null) => {
    if (activeRef.current === i) return
    activeRef.current = i
    setActive(i)
    if (i !== null) setTick((t) => t + 1)
  }

  const track = (e: React.PointerEvent) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }

  return (
    <div className="relative mt-16 md:mt-24" onPointerMove={track}
      onPointerEnter={() => setInside(true)}
      onPointerLeave={() => {
        setInside(false)
        activate(null)
      }}
    >
      <div className="hidden grid-cols-12 gap-6 pb-4 text-muted md:grid">
        <span className="eyebrow col-span-1">{work.indexColumns.number}</span>
        <span className="eyebrow col-span-6">{work.indexColumns.project}</span>
        <span className="eyebrow col-span-3">{work.indexColumns.discipline}</span>
        <span className="eyebrow col-span-2">{work.indexColumns.year}</span>
      </div>
      <ul className="border-b hairline">
        {projects.map((project, i) => {
          const dim = active !== null && active !== i
          return (
            <li key={project.slug} className="border-t hairline">
              <Link
                to={href(project)}
                onPointerEnter={(e) => {
                  if (activeRef.current === null) {
                    sx.jump(e.clientX)
                    sy.jump(e.clientY)
                  }
                  activate(i)
                }}
                onFocus={() => activate(i)}
                onBlur={() => activate(null)}
                className={cn(
                  'group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 py-6 transition-opacity duration-500 md:grid-cols-12 md:gap-6 md:py-8',
                  dim && 'md:opacity-35',
                )}
              >
                <span className="font-display text-lg text-muted italic md:col-span-1">{pad(i + 1)}</span>
                <span className="min-w-0 md:col-span-6">
                  <span className="block font-display text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.02] tracking-[-0.025em] transition-transform duration-700 ease-editorial group-hover:translate-x-3">
                    {project.client}
                  </span>
                  <span className="mt-1.5 block truncate text-sm text-muted md:hidden">
                    {project.discipline} · {project.year}
                  </span>
                  <span className="mt-2 hidden text-[0.95rem] text-muted md:block">{plain(project.title)}</span>
                </span>
                <span className="hidden text-muted md:col-span-3 md:block">{project.discipline}</span>
                <span className="hidden items-center justify-between text-muted tabular-nums md:col-span-2 md:flex">
                  {project.year}
                  <span className="grid size-11 place-items-center rounded-full border hairline transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                    <ArrowUpRight className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </span>
                {/* Touch screens: a thumbnail instead of the floating preview. */}
                <img
                  src={project.cover.src}
                  alt=""
                  width={project.cover.width}
                  height={project.cover.height}
                  loading="lazy"
                  className="size-16 rounded-sm object-cover md:hidden"
                  style={{ objectPosition: project.coverFocus }}
                />
              </Link>
            </li>
          )
        })}
      </ul>

      {fine && <FloatingPreview project={inside && active !== null ? projects[active] : null} tick={tick} x={sx} y={sy} />}
    </div>
  )
}

function FloatingPreview({
  project,
  tick,
  x,
  y,
}: {
  project: Project | null
  tick: number
  x: MotionValue<number>
  y: MotionValue<number>
}) {
  // Hide on scroll so the preview never floats over the wrong row.
  const [scrolling, setScrolling] = useState(false)
  useEffect(() => {
    let timer = 0
    const onScroll = () => {
      setScrolling(true)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setScrolling(false), 140)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
    }
  }, [])

  const visible = project !== null && !scrolling

  return (
    <motion.div className="pointer-events-none fixed top-0 left-0 z-40 hidden md:block" style={{ x, y }} aria-hidden="true">
      <motion.div
        className="relative -translate-y-1/2 translate-x-8 overflow-hidden bg-surface shadow-[0_30px_60px_-24px_color-mix(in_oklab,var(--color-foreground)_45%,transparent)]"
        style={{ width: 'clamp(16rem, 24vw, 24rem)', aspectRatio: '3 / 2' }}
        initial={false}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85, rotate: visible ? -2 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <AnimatePresence initial={false}>
          {project && (
            <motion.img
              key={tick}
              src={project.cover.src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: project.coverFocus, zIndex: tick }}
              initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.2 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
              exit={{ scale: 1.1, transition: { duration: 0.7, ease: EASE_IN_OUT } }}
              transition={{ duration: 0.6, ease: EASE_IN_OUT }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
