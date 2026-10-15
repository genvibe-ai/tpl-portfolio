import { motion, useIsPresent, useReducedMotion } from 'motion/react'
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigationType, type Location } from 'react-router'
import { projects, site, ui } from '../../content'
import { EASE_IN_OUT } from '../../lib/motion'
import { Footer } from './Footer'

/** Scroll position per history entry, restored on back/forward. */
const positions = new Map<string, number>()
let firstPage = true

/** Seconds until a freshly mounted page is uncovered (0 on the first visit, when there is no curtain). */
const EnterDelay = createContext(0)
export const useEnterDelay = () => useContext(EnterDelay)

/** The name shown on the transition curtain for a path. */
function pageName(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return site.name
  if (path.startsWith('/work/')) return projects.find((p) => p.slug === path.split('/')[2])?.client ?? ui.pageNames.notFound
  if (path === '/about') return ui.pageNames.about
  if (path === '/contact') return ui.pageNames.contact
  return ui.pageNames.notFound
}

function Curtain({ label }: { label: string }) {
  return (
    <span className="font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-none tracking-[-0.03em] italic">
      {label}
      <span className="text-accent not-italic">.</span>
    </span>
  )
}

/**
 * Wraps each page (keyed by path in App.tsx). Leaving a page slides an ink curtain up over it,
 * naming the destination; the next page mounts underneath and the curtain lifts away.
 * Reduced motion: a short crossfade instead.
 */
export function PageShell({ location, children }: { location: Location; children: ReactNode }) {
  const destination = useLocation() // while this page exits, this is already the next page
  const navigationType = useNavigationType()
  const reduce = useReducedMotion()
  const isPresent = useIsPresent()
  const first = useRef(firstPage)
  const [lifted, setLifted] = useState(first.current)

  useEffect(() => {
    firstPage = false
  }, [])

  // Place the new page: restore the old position on back/forward, else jump to the #hash or the top.
  useLayoutEffect(() => {
    const saved = positions.get(location.key)
    if (navigationType === 'POP' && saved !== undefined) {
      window.scrollTo(0, saved)
    } else if (location.hash) {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
    // After a navigation, start keyboard and screen-reader focus at the new page's content.
    if (!first.current) document.getElementById('main')?.focus({ preventScroll: true })
    // Runs once per page mount, under the curtain.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isPresent) return
    let frame = 0
    const save = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => positions.set(location.key, window.scrollY))
    }
    window.addEventListener('scroll', save, { passive: true })
    return () => {
      window.removeEventListener('scroll', save)
      cancelAnimationFrame(frame)
    }
  }, [isPresent, location.key])

  const enterDelay = first.current || reduce ? 0 : 0.5

  return (
    <EnterDelay.Provider value={enterDelay}>
      <motion.div
        id="page"
        initial={reduce && !first.current ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        exit={reduce ? { opacity: 0 } : undefined}
        transition={{ duration: 0.25 }}
      >
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer showCta={location.pathname.replace(/\/+$/, '') !== '/contact'} />
      </motion.div>

      {!reduce && (
        <>
          {/* Covers this page as it leaves (hidden until then, so it never peeks below the fold). */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[65] flex items-center justify-center bg-inverse text-inverse-foreground"
            style={{ visibility: isPresent ? 'hidden' : 'visible' }}
            initial={{ y: '100%' }}
            animate={{ y: '100%' }}
            exit={{ y: '0%' }}
            transition={{ duration: 0.55, ease: EASE_IN_OUT }}
          >
            <Curtain label={pageName(destination.pathname)} />
          </motion.div>
          {/* Lifts off this page as it arrives (skipped on the very first visit), then unmounts. */}
          {!lifted && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-[65] flex items-center justify-center bg-inverse text-inverse-foreground"
              initial={{ y: '0%' }}
              animate={{ y: '-100%' }}
              transition={{ duration: 0.75, ease: EASE_IN_OUT, delay: 0.12 }}
              onAnimationComplete={() => setLifted(true)}
            >
            <motion.span
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: EASE_IN_OUT, delay: 0.12 }}
            >
                <Curtain label={pageName(location.pathname)} />
              </motion.span>
            </motion.div>
          )}
        </>
      )}
    </EnterDelay.Provider>
  )
}
