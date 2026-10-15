import { useEnterDelay } from '../components/layout/PageShell'
import { Accent } from '../components/ui/Accent'
import { ButtonLink } from '../components/ui/Button'
import { MaskReveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { notFound, site, ui } from '../content'
import { usePageMeta } from '../hooks/usePageMeta'

export function NotFoundContent() {
  const enter = useEnterDelay()
  return (
    <section className="container-page flex min-h-[86svh] flex-col justify-center pt-32 pb-24">
      <SectionLabel index={notFound.eyebrow}>{ui.pageNames.notFound}</SectionLabel>
      <h1 className="display-hero mt-8 max-w-[13ch]">
        <MaskReveal immediate delay={enter + 0.1}>
          <Accent text={notFound.title} />
        </MaskReveal>
      </h1>
      <p className="lead mt-8 max-w-xl text-muted">{notFound.text}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href={notFound.primary.href}>{notFound.primary.label}</ButtonLink>
        <ButtonLink href={notFound.secondary.href} variant="outline" icon={false}>
          {notFound.secondary.label}
        </ButtonLink>
      </div>
    </section>
  )
}

export default function NotFound() {
  usePageMeta({ title: `${ui.pageNames.notFound} · ${site.name}` })
  return <NotFoundContent />
}
