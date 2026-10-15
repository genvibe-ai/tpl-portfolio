import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { contact, nav, site, ui } from '../../content'
import { cn, pad } from '../../lib/format'
import { EASE, EASE_IN_OUT } from '../../lib/motion'
import { ButtonLink } from '../ui/Button'
import { SmartLink } from '../ui/SmartLink'

/** "Ines Valtor." with the last character in the accent color. */
export function Logo({ className }: { className?: string }) {
  const text = site.logo
  return (
    <span className={cn('font-display text-[1.4rem] leading-none tracking-[-0.02em]', className)}>
      {text.slice(0, -1)}
      <span className="text-accent">{text.slice(-1)}</span>
    </span>
  )
}

/** Which nav link is active for a path ("/work/x" lights up Work). */
function isActive(href: string, pathname: string) {
  if (href.includes('#')) return pathname.startsWith('/work')
  return href !== '/' && pathname.startsWith(href)
}

export function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const holdUntil = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    // Hide while scrolling down, show again on any scroll up (not for the jump that places a new page).
    if (performance.now() < holdUntil.current) return
    setHidden(y > 240 && y > previous + 2)
  })

  // A new page closes the menu and brings the bar back.
  useEffect(() => {
    setOpen(false)
    setHidden(false)
    holdUntil.current = performance.now() + 1600
  }, [pathname])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !open ? '-105%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div
          className={cn(
            'absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
            scrolled ? 'hairline bg-background/85 backdrop-blur-md' : 'border-transparent bg-transparent',
          )}
        />
        <div className="container-page relative flex h-18 items-center justify-between gap-6">
          <Link to="/" className="group -m-2 rounded-sm p-2" aria-label={`${site.name}, home`}>
            <Logo className="transition-opacity group-hover:opacity-70" />
          </Link>

          <nav aria-label={ui.primaryNav} className="hidden items-center gap-9 md:flex">
            <ul className="flex items-center gap-8">
              {nav.links.map((link) => {
                const active = isActive(link.href, pathname)
                return (
                  <li key={link.href}>
                    <SmartLink
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className="link-draw relative py-1 text-[0.95rem] font-medium"
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute top-1/2 -left-3.5 size-1.5 -translate-y-1/2 rounded-full bg-accent"
                          transition={{ duration: 0.5, ease: EASE }}
                        />
                      )}
                      {link.label}
                    </SmartLink>
                  </li>
                )
              })}
            </ul>
            <p className="hidden items-center gap-2.5 text-sm text-muted xl:flex">
              <span className="live-dot" aria-hidden="true" />
              {site.availability}
            </p>
            <ButtonLink href={nav.cta.href} size="sm">
              {nav.cta.label}
            </ButtonLink>
          </nav>

          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="group -mr-2 flex items-center gap-3 rounded-full px-2 py-2 text-[0.95rem] font-medium md:hidden"
          >
            {ui.openMenu}
            <span aria-hidden="true" className="flex w-6 flex-col gap-1.5">
              <span className="h-px w-full bg-foreground transition-transform duration-300 group-hover:translate-x-0.5" />
              <span className="h-px w-2/3 self-end bg-foreground transition-[width] duration-300 group-hover:w-full" />
            </span>
          </button>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} returnFocus={menuButton} pathname={pathname} />
    </>
  )
}

function MobileMenu({
  open,
  onClose,
  returnFocus,
  pathname,
}: {
  open: boolean
  onClose: () => void
  returnFocus: React.RefObject<HTMLButtonElement | null>
  pathname: string
}) {
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    // Keep keyboard focus inside the menu: the page behind it is inert while it is open.
    const page = document.getElementById('page')
    page?.setAttribute('inert', '')
    closeButton.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const button = returnFocus.current
    return () => {
      root.style.overflow = previous
      page?.removeAttribute('inert')
      window.removeEventListener('keydown', onKey)
      button?.focus()
    }
  }, [open, onClose, returnFocus])

  const links = [nav.home, ...nav.links]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={ui.openMenu}
          className="fixed inset-0 z-[60] flex flex-col bg-background md:hidden"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.6, ease: EASE_IN_OUT }}
        >
          <div className="container-page flex h-18 items-center justify-between">
            <Link to="/" onClick={onClose} aria-label={`${site.name}, home`}>
              <Logo />
            </Link>
            <button
              ref={closeButton}
              type="button"
              onClick={onClose}
              className="-mr-2 flex items-center gap-3 rounded-full px-2 py-2 text-[0.95rem] font-medium"
            >
              {ui.closeMenu}
              <span aria-hidden="true" className="relative block size-5">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-foreground" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-foreground" />
              </span>
            </button>
          </div>

          <nav aria-label={ui.primaryNav} className="container-page flex flex-1 flex-col justify-center">
            <ul className="border-t hairline">
              {links.map((link, i) => {
                const active = link.href === '/' ? pathname === '/' : isActive(link.href, pathname)
                return (
                  <li key={link.href} className="border-b hairline">
                    <span className="line-mask">
                      <motion.span
                        className="block"
                        initial={{ y: '105%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.07 }}
                      >
                        <SmartLink
                          href={link.href}
                          onClick={onClose}
                          aria-current={active ? 'page' : undefined}
                          className="flex items-baseline justify-between py-4 font-display text-[2.6rem] leading-none tracking-[-0.03em] transition-colors hover:text-accent-strong"
                        >
                          <span className={cn(active && 'italic text-accent')}>{link.label}</span>
                          <span className="font-sans text-xs font-semibold text-muted">{pad(i + 1)}</span>
                        </SmartLink>
                      </motion.span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </nav>

          <motion.div
            className="container-page space-y-5 pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <p className="flex items-center gap-2.5 text-sm text-muted">
              <span className="live-dot" aria-hidden="true" />
              {site.availability}
            </p>
            <a href={`mailto:${contact.email}`} className="link-under block font-display text-2xl">
              {contact.email}
            </a>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
