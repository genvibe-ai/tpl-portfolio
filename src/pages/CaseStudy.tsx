import { ArrowLeft } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { useEnterDelay } from '../components/layout/PageShell'
import { GalleryPanel } from '../components/case/GalleryPanel'
import { Accent } from '../components/ui/Accent'
import { buttonClasses, RollLabel } from '../components/ui/Button'
import { MaskReveal, Reveal, RevealFrame } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { caseStudy, projects, site, testimonials, ui, type Project, type Testimonial } from '../content'
import { usePageMeta } from '../hooks/usePageMeta'
import { pad, plain } from '../lib/format'
import { EASE } from '../lib/motion'
import { NotFoundContent } from './NotFound'

export default function CaseStudy() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = index >= 0 ? projects[index] : undefined

  usePageMeta(
    project
      ? { title: `${project.client}: ${plain(project.title)} · ${site.name}`, description: project.summary, image: project.cover.src }
      : { title: `${ui.pageNames.notFound} · ${site.name}` },
  )

  if (!project) return <NotFoundContent />

  const nextIndex = (index + 1) % projects.length
  const quote = testimonials.items.find((t) => t.project === project.slug)

  return (
    <article>
      <CaseHeader project={project} index={index} />
      <CaseHero project={project} />
      <CaseBody project={project} />
      <CaseGallery project={project} />
      {quote && <CaseQuote quote={quote} />}
      {projects.length > 1 && <NextProject project={projects[nextIndex]} index={nextIndex} />}
    </article>
  )
}

function CaseHeader({ project, index }: { project: Project; index: number }) {
  const enter = useEnterDelay()
  const meta = [
    { label: caseStudy.meta.client, value: project.client },
    { label: caseStudy.meta.role, value: project.role },
    { label: caseStudy.meta.year, value: String(project.year) },
    { label: caseStudy.meta.duration, value: project.duration },
  ]
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay: enter + delay },
  })

  return (
    <header className="container-page pt-28 md:pt-36">
      <motion.nav {...fade(0.05)} aria-label={caseStudy.breadcrumbLabel} className="flex items-center justify-between gap-6 text-sm">
        <ol className="flex items-center gap-2 text-muted">
          <li>
            <Link to="/#work" className="group inline-flex items-center gap-2 hover:text-foreground">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              {caseStudy.breadcrumb}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {project.client}
          </li>
        </ol>
        <p className="font-display text-base text-muted italic">
          <span className="text-accent-strong">{pad(index + 1)}</span> {caseStudy.of} {pad(projects.length)}
        </p>
      </motion.nav>

      <motion.p {...fade(0.1)} className="eyebrow mt-12 text-muted md:mt-16">
        {project.discipline} · {project.year}
      </motion.p>
      <h1 className="display-xl mt-5 max-w-[18ch]">
        <MaskReveal immediate delay={enter + 0.12}>
          <Accent text={project.title} />
        </MaskReveal>
      </h1>
      <motion.p {...fade(0.3)} className="lead mt-8 max-w-[42rem] text-muted">
        {project.summary}
      </motion.p>

      <motion.dl {...fade(0.4)} className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t hairline pt-8 md:mt-16 lg:grid-cols-12">
        {meta.map((item) => (
          <div key={item.label} className="lg:col-span-2">
            <dt className="eyebrow text-muted">{item.label}</dt>
            <dd className="mt-2 font-medium">{item.value}</dd>
          </div>
        ))}
        <div className="col-span-2 lg:col-span-4">
          <dt className="eyebrow text-muted">{caseStudy.meta.scope}</dt>
          <dd className="mt-2">
            <ul className="flex flex-wrap gap-1.5">
              {project.scope.map((s) => (
                <li key={s} className="rounded-full border hairline px-3 py-1 text-[0.8rem] font-medium">
                  {s}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </motion.dl>
    </header>
  )
}

function CaseHero({ project }: { project: Project }) {
  const enter = useEnterDelay()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <div ref={ref} className="container-page mt-14 md:mt-20">
      <RevealFrame immediate delay={enter + 0.35} className="relative aspect-[4/3] bg-surface md:aspect-[16/9]">
        <motion.img
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          fetchPriority="high"
          className="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover"
          style={{ y, objectPosition: project.coverFocus }}
        />
      </RevealFrame>
    </div>
  )
}

function CaseSection({ n, label, children }: { n: number; label: string; children: ReactNode }) {
  return (
    <section className="grid gap-6 lg:grid-cols-12 lg:gap-6" aria-label={label}>
      <div className="lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <SectionLabel index={pad(n)}>{label}</SectionLabel>
        </div>
      </div>
      <div className="lg:col-span-8 lg:col-start-5">{children}</div>
    </section>
  )
}

function CaseBody({ project }: { project: Project }) {
  const [lead, ...rest] = project.challenge
  return (
    <div className="container-page mt-24 space-y-24 md:mt-36 md:space-y-32">
      <CaseSection n={1} label={caseStudy.sections.challenge}>
        <Reveal>
          <p className="display-md">{lead}</p>
          {rest.map((p) => (
            <p key={p} className="mt-6 text-lg text-muted">
              {p}
            </p>
          ))}
        </Reveal>
      </CaseSection>

      <CaseSection n={2} label={caseStudy.sections.approach}>
        <Reveal className="space-y-5 text-lg text-muted">
          {project.approach.text.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <ol className="mt-10 border-t hairline">
          {project.approach.points.map((point, i) => (
            <motion.li
              key={point}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
              className="grid grid-cols-[3rem_1fr] items-baseline border-b hairline py-5"
            >
              <span className="font-display text-accent-strong italic">{pad(i + 1)}</span>
              <span className="text-[1.0625rem]">{point}</span>
            </motion.li>
          ))}
        </ol>
      </CaseSection>

      <CaseSection n={3} label={caseStudy.sections.outcome}>
        <Reveal className="space-y-5 text-lg text-muted">
          {project.outcome.text.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <dl className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {project.outcome.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="flex flex-col-reverse justify-end gap-2 border-t border-foreground pt-5">
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="font-display text-[clamp(2.6rem,4.6vw,4rem)] leading-none tracking-[-0.03em]">{stat.value}</dd>
            </Reveal>
          ))}
        </dl>
      </CaseSection>
    </div>
  )
}

function CaseGallery({ project }: { project: Project }) {
  if (!project.gallery.length) return null
  return (
    <section aria-labelledby="gallery-title" className="container-page section-pad">
      <h2 id="gallery-title" className="display-lg border-t hairline pt-12">
        <MaskReveal>
          <Accent text={caseStudy.galleryTitle} />
        </MaskReveal>
      </h2>
      <div className="mt-12 grid gap-x-6 gap-y-14 md:mt-16 md:grid-cols-2">
        {project.gallery.map((item, i) => (
          <GalleryPanel key={i} item={item} project={project} figure={i + 1} />
        ))}
      </div>
    </section>
  )
}

function CaseQuote({ quote }: { quote: Testimonial }) {
  return (
    <section className="section-pad bg-surface">
      <Reveal>
        <figure className="container-page max-w-[68rem]">
          <blockquote className="font-display text-[clamp(1.85rem,4vw,3.5rem)] leading-[1.14] tracking-[-0.02em]">
            <span className="text-accent">“</span>
            {quote.quote}
            <span className="text-accent">”</span>
          </blockquote>
          <figcaption className="mt-10 flex items-center gap-4">
            <img
              src={quote.avatar.src}
              alt=""
              width={quote.avatar.width}
              height={quote.avatar.height}
              loading="lazy"
              className="size-14 rounded-full object-cover"
            />
            <span>
              <span className="block font-semibold">{quote.name}</span>
              <span className="block text-sm text-muted">{quote.role}</span>
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  )
}

function NextProject({ project, index }: { project: Project; index: number }) {
  return (
    <section aria-labelledby="next-title" className="border-t hairline">
      <Link to={`/work/${project.slug}`} className="group block focus-visible:outline-offset-[-6px]">
        <div className="container-page grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-6">
          <div className="lg:col-span-5">
            <p className="eyebrow text-muted">
              {ui.nextProject} <span className="ml-2 font-display text-[0.95rem] tracking-normal normal-case italic text-accent-strong">{pad(index + 1)}</span>
            </p>
            <h2 id="next-title" className="display-xl mt-6 transition-transform duration-700 ease-editorial group-hover:translate-x-2">
              {project.client}
            </h2>
            <p className="mt-4 max-w-[34ch] text-lg text-muted">
              <Accent text={project.title} tone="inherit" />
            </p>
            <span className={buttonClasses('primary') + ' mt-10'}>
              <RollLabel>{ui.readCase}</RollLabel>
            </span>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden bg-surface lg:col-span-7">
            <img
              src={project.cover.src}
              alt=""
              width={project.cover.width}
              height={project.cover.height}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.05]"
              style={{ objectPosition: project.coverFocus }}
            />
          </div>
        </div>
      </Link>
    </section>
  )
}
