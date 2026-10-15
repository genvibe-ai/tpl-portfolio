import { Download, MapPin } from 'lucide-react'
import { motion, useScroll } from 'motion/react'
import { useRef } from 'react'
import { RegistrationMark } from '../components/home/AboutTeaser'
import { useEnterDelay } from '../components/layout/PageShell'
import { Accent } from '../components/ui/Accent'
import { buttonClasses, ButtonLink, RollLabel } from '../components/ui/Button'
import { MaskReveal, Reveal, RevealFrame } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { about, images, nav, site, ui } from '../content'
import { usePageMeta } from '../hooks/usePageMeta'
import { pad } from '../lib/format'
import { EASE } from '../lib/motion'

export default function About() {
  usePageMeta({ title: `${ui.pageNames.about} · ${site.name}`, description: about.intro, image: images.portrait.src })
  return (
    <>
      <AboutHeader />
      <Story />
      <Principles />
      <Experience />
      <Awards />
      <Resume />
    </>
  )
}

function AboutHeader() {
  const enter = useEnterDelay()
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay: enter + delay },
  })
  return (
    <header className="container-page pt-28 md:pt-36">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-6">
        <div className="lg:col-span-7">
          <motion.div {...fade(0.05)}>
            <SectionLabel>{about.eyebrow}</SectionLabel>
          </motion.div>
          <h1 className="display-xl mt-6">
            <MaskReveal immediate delay={enter + 0.1}>
              <Accent text={about.title} />
            </MaskReveal>
          </h1>
          <motion.p {...fade(0.3)} className="lead mt-8 max-w-[40rem] text-muted">
            {about.intro}
          </motion.p>
          <motion.div {...fade(0.4)} className="mt-10 flex flex-wrap gap-3">
            <a href={about.resume.href} download className={buttonClasses('primary')}>
              <RollLabel>{about.resume.label}</RollLabel>
              <Download className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </a>
            <ButtonLink href={nav.cta.href} variant="outline" icon={false}>
              {nav.cta.label}
            </ButtonLink>
          </motion.div>
        </div>
        <div className="relative lg:col-span-4 lg:col-start-9">
          <RevealFrame immediate delay={enter + 0.25} className="aspect-[4/5] bg-surface">
            <img
              src={images.portrait.src}
              alt={images.portrait.alt}
              width={images.portrait.width}
              height={images.portrait.height}
              fetchPriority="high"
              className="h-full w-full object-cover object-[42%_50%]"
            />
          </RevealFrame>
          <RegistrationMark className="absolute -top-5 -left-5 size-10 text-accent" />
          <motion.p {...fade(0.6)} className="mt-4 flex items-center justify-between text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" />
              {site.location}
            </span>
            <span className="font-display italic">{about.portraitCaption}</span>
          </motion.p>
        </div>
      </div>
    </header>
  )
}

function Story() {
  const [first, ...rest] = about.story
  return (
    <section aria-labelledby="story-title" className="container-page section-pad">
      <div className="grid gap-8 border-t hairline pt-12 lg:grid-cols-12 lg:gap-6">
        <SectionLabel as="h2" id="story-title" index="01" className="self-start lg:col-span-3">
          {about.storyTitle}
        </SectionLabel>
        <Reveal className="space-y-6 text-lg text-muted lg:col-span-8 lg:col-start-5">
          <p className="text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.5] text-foreground first-letter:float-left first-letter:mt-[0.08em] first-letter:mr-3 first-letter:font-display first-letter:text-[4.6em] first-letter:leading-[0.8] first-letter:text-accent">
            {first}
          </p>
          {rest.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Principles() {
  return (
    <section aria-labelledby="principles-title" className="bg-surface section-pad">
      <div className="container-page">
        <SectionLabel as="h2" id="principles-title" index="02">
          {about.principlesTitle}
        </SectionLabel>
        <ol className="mt-10 grid gap-px overflow-hidden border hairline bg-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
          {about.principles.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.07 }}
              className="group flex min-h-48 flex-col justify-between gap-8 bg-surface p-7 transition-colors duration-500 hover:bg-raised sm:min-h-64"
            >
              <span className="font-display text-4xl text-muted italic transition-colors duration-500 group-hover:text-accent">{pad(i + 1)}</span>
              <span>
                <span className="display-md block">{item.title}</span>
                <span className="mt-3 block text-muted">{item.text}</span>
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] })
  return (
    <section aria-labelledby="experience-title" className="container-page section-pad">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <SectionLabel as="h2" id="experience-title" index="03">
              {about.experienceTitle}
            </SectionLabel>
          </div>
        </div>
        <ol ref={ref} className="relative lg:col-span-8 lg:col-start-5">
          {/* The rail fills with vermilion as you read down the list. */}
          <span aria-hidden="true" className="absolute top-3 bottom-3 left-[7px] w-px bg-foreground/15" />
          <motion.span
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[7px] w-px origin-top bg-accent"
            style={{ scaleY: scrollYProgress }}
          />
          {about.experience.map((item, i) => (
            <motion.li
              key={item.period}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}
              className="relative grid gap-x-6 gap-y-2 pb-12 pl-10 last:pb-0 md:grid-cols-8"
            >
              <span aria-hidden="true" className="absolute top-1.5 left-0 size-[15px] rounded-full border-2 border-accent bg-background" />
              <p className="font-display text-lg text-muted italic md:col-span-2">{item.period}</p>
              <div className="md:col-span-6">
                <h3 className="display-md">{item.role}</h3>
                <p className="mt-1 font-medium">{item.place}</p>
                <p className="mt-3 text-muted">{item.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Awards() {
  return (
    <section aria-labelledby="awards-title" className="container-page pb-24 md:pb-36">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-3">
          <SectionLabel as="h2" id="awards-title" index="04">
            {about.awardsTitle}
          </SectionLabel>
        </div>
        <div className="lg:col-span-8 lg:col-start-5">
          <ul className="border-t hairline">
            {about.awards.map((award, i) => (
              <motion.li
                key={award.title + award.year}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}
                className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-b hairline py-5 md:grid-cols-12 md:gap-x-6"
              >
                <span className="font-display text-accent-strong italic md:col-span-1">{award.year}</span>
                <span className="font-display text-[1.45rem] leading-tight transition-transform duration-500 ease-editorial group-hover:translate-x-1.5 md:col-span-5">
                  {award.title}
                </span>
                <span className="col-start-2 text-muted md:col-span-4 md:col-start-auto">{award.category}</span>
                <span className="col-start-2 text-sm text-muted md:col-span-2 md:col-start-auto md:text-right">{award.project}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Resume() {
  return (
    <section aria-labelledby="resume-title" className="container-page pb-24 md:pb-36">
      <Reveal className="relative overflow-hidden bg-inverse px-6 py-14 text-inverse-foreground sm:px-12 md:py-20">
        <RegistrationMark className="absolute top-6 right-6 size-9 text-accent" />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="resume-title" className="display-lg">
              <Accent text={about.resume.title} />
            </h2>
            <p className="mt-5 max-w-md text-inverse-muted">{about.resume.text}</p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:col-start-9 lg:items-end">
            <a href={about.resume.href} download className={buttonClasses('accent')}>
              <RollLabel>{about.resume.label}</RollLabel>
              <Download className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </a>
            <p className="text-sm text-inverse-muted">{about.resume.meta}</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
