import { AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Nav } from './components/layout/Nav'
import { PageShell } from './components/layout/PageShell'
import { ui } from './content'
import About from './pages/About'
import CaseStudy from './pages/CaseStudy'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

/** Links within the same page ("/#work" while on the home page) scroll smoothly instead of re-rendering it. */
function useSamePageScroll() {
  const location = useLocation()
  const reduce = useReducedMotion()
  const previous = useRef<string | null>(null)
  useEffect(() => {
    if (previous.current === location.pathname) {
      const behavior = reduce ? 'auto' : 'smooth'
      const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null
      if (target) target.scrollIntoView({ behavior })
      else window.scrollTo({ top: 0, behavior })
    }
    previous.current = location.pathname
    // Only on navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key])
}

/** Routes: / (home), /work/:slug (one case study per project in content.ts), /about, /contact, and a 404. */
export default function App() {
  const location = useLocation()
  useSamePageScroll()

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault()
          const main = document.getElementById('main')
          main?.focus({ preventScroll: true })
          main?.scrollIntoView()
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-3 focus:text-sm focus:text-background"
      >
        {ui.skipToContent}
      </a>
      <Nav />
      <AnimatePresence mode="wait">
        <PageShell key={location.pathname} location={location}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageShell>
      </AnimatePresence>
    </MotionConfig>
  )
}
