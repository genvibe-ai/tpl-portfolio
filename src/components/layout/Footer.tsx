import { ArrowUp, Check, Copy } from 'lucide-react'
import { closing, contact, footer, site, ui } from '../../content'
import { useCopy } from '../../hooks/useCopy'
import { useLocalTime } from '../../hooks/useLocalTime'
import { Accent } from '../ui/Accent'
import { ButtonLink } from '../ui/Button'
import { MaskReveal, Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { SmartLink } from '../ui/SmartLink'
import { Wordmark } from './Wordmark'

/** Vermilion strip of what is on offer, scrolling sideways. */
function Marquee() {
  const items = [...closing.marquee, ...closing.marquee]
  return (
    <div className="overflow-hidden bg-accent py-4 text-accent-foreground" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={i} className="flex items-center font-display text-[1.65rem] leading-none tracking-[-0.01em] italic">
                <span className="px-7">{item}</span>
                <svg viewBox="0 0 20 20" className="size-3.5 shrink-0" fill="currentColor">
                  <path d="M10 0l2.2 7.8L20 10l-7.8 2.2L10 20l-2.2-7.8L0 10l7.8-2.2z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function CopyEmailButton({ inverse = false }: { inverse?: boolean }) {
  const { copied, copy } = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(contact.email)}
      className={
        inverse
          ? 'inline-flex h-10 items-center gap-2 rounded-full border border-inverse-foreground/25 px-4 text-sm font-medium transition-colors hover:border-inverse-foreground hover:bg-inverse-foreground hover:text-inverse'
          : 'inline-flex h-10 items-center gap-2 rounded-full border border-foreground/25 px-4 text-sm font-medium transition-colors hover:border-foreground hover:bg-foreground hover:text-background'
      }
    >
      {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? ui.copied : ui.copyEmail}</span>
    </button>
  )
}

export function Footer({ showCta = true }: { showCta?: boolean }) {
  const time = useLocalTime(site.timezone)

  return (
    <footer className="relative bg-inverse text-inverse-foreground">
      {showCta && <Marquee />}

      {showCta && (
        <section aria-labelledby="closing-title" className="container-page pt-24 pb-20 md:pt-32 md:pb-28">
          <SectionLabel inverse>{closing.eyebrow}</SectionLabel>
          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-end">
            <h2 id="closing-title" className="display-xl lg:col-span-8">
              <MaskReveal>
                <Accent text={closing.title} />
              </MaskReveal>
            </h2>
            <Reveal className="lg:col-span-4" delay={0.1}>
              <p className="text-inverse-muted">{closing.text}</p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="mt-14 flex flex-col gap-8 border-t hairline-inverse pt-10 md:flex-row md:items-center md:justify-between">
            <a
              href={`mailto:${contact.email}`}
              className="link-under self-start font-display text-[clamp(1.6rem,4.2vw,3.25rem)] leading-tight tracking-[-0.02em] break-all sm:break-normal"
            >
              {contact.email}
            </a>
            <div className="flex flex-wrap items-center gap-3">
              <CopyEmailButton inverse />
              <ButtonLink href={closing.cta.href} variant="accent">
                {closing.cta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </section>
      )}

      <div className={showCta ? 'container-page overflow-hidden' : 'container-page overflow-hidden pt-10 md:pt-16'}>
        <Wordmark
          text={footer.wordmark}
          className="-mb-[0.06em] pt-10 text-center font-display text-[16.4vw] leading-[0.95] tracking-[-0.045em] text-inverse-foreground min-[90rem]:text-[14.6rem]"
        />
      </div>

      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 border-t hairline-inverse pt-12 pb-10 text-sm lg:grid-cols-12">
        <nav aria-label={footer.sitemapTitle} className="lg:col-span-3">
          <h2 className="eyebrow text-inverse-muted">{footer.sitemapTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {footer.links.map((link) => (
              <li key={link.href}>
                <SmartLink href={link.href} className="link-draw text-base">
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <h2 className="eyebrow text-inverse-muted">{footer.socialTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw text-base">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 sm:col-span-1 lg:col-span-3">
          <h2 className="eyebrow text-inverse-muted">{footer.studioTitle}</h2>
          <address className="mt-4 space-y-1 text-base not-italic">
            {contact.studio.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
          <p className="mt-4 flex items-center gap-2 text-inverse-muted">
            <span className="live-dot" aria-hidden="true" />
            {ui.localTime} {site.timezoneLabel} <span className="text-inverse-foreground tabular-nums">{time}</span>
          </p>
        </div>
        <div className="col-span-2 flex flex-col justify-between gap-8 sm:col-span-1 lg:col-span-3 lg:items-end">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
            className="group inline-flex items-center gap-3 self-start text-base font-medium lg:self-end"
          >
            {ui.backToTop}
            <span className="grid size-10 place-items-center rounded-full border border-inverse-foreground/25 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
              <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </button>
          <p className="text-inverse-muted">{site.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
