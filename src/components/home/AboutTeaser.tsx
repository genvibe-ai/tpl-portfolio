import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { aboutTeaser, images } from '../../content'
import { Accent } from '../ui/Accent'
import { ButtonLink } from '../ui/Button'
import { MaskReveal, Reveal, RevealFrame } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

/** A printer's registration mark, used as a small editorial flourish. */
export function RegistrationMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="20" cy="20" r="11" />
      <circle cx="20" cy="20" r="4.5" fill="currentColor" stroke="none" />
      <path d="M20 0v40M0 20h40" />
    </svg>
  )
}

export function AboutTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section aria-labelledby="about-title" className="section-pad">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-6">
        <div ref={ref} className="relative lg:col-span-5">
          <RevealFrame className="relative aspect-square bg-surface">
            <motion.img
              src={images.portrait.src}
              alt={images.portrait.alt}
              width={images.portrait.width}
              height={images.portrait.height}
              loading="lazy"
              className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
              style={{ y }}
            />
          </RevealFrame>
          <RegistrationMark className="absolute -top-5 -right-5 size-10 text-accent" />
          <p className="mt-4 text-sm text-muted">{aboutTeaser.caption}</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionLabel index="04">{aboutTeaser.eyebrow}</SectionLabel>
          <h2 id="about-title" className="display-lg mt-6">
            <MaskReveal>
              <Accent text={aboutTeaser.title} />
            </MaskReveal>
          </h2>
          <Reveal delay={0.1} className="mt-8 space-y-4 text-lg text-muted">
            {aboutTeaser.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-y hairline py-7">
              {aboutTeaser.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col-reverse justify-end gap-1">
                  <dt className="text-sm text-muted">{fact.label}</dt>
                  <dd className="font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-none tracking-[-0.03em]">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <ButtonLink href={aboutTeaser.cta.href} variant="outline" className="mt-10">
              {aboutTeaser.cta.label}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
