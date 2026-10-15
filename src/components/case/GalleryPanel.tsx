import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { caseStudy, theme, type GalleryItem, type Project } from '../../content'
import { useCopy } from '../../hooks/useCopy'
import { cn, readableOn } from '../../lib/format'
import { MarkArt } from '../ui/Mark'
import { RevealFrame } from '../ui/Reveal'

const ASPECT = { portrait: 'aspect-[4/5]', landscape: 'aspect-[3/2]', wide: 'aspect-[16/9]' } as const

/** One tile in a case study's image sequence: a cropped photo, the mark artwork, the palette or the type specimen. */
export function GalleryPanel({ item, project, figure }: { item: GalleryItem; project: Project; figure: number }) {
  const full = item.layout === 'full'
  return (
    <figure className={cn('min-w-0', full && 'md:col-span-2')}>
      {item.kind === 'image' && (
        <RevealFrame className={cn('bg-surface', ASPECT[item.aspect ?? (full ? 'wide' : 'portrait')])}>
          <img
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ objectPosition: item.focus ?? project.coverFocus }}
          />
        </RevealFrame>
      )}
      {item.kind === 'mark' && (
        <RevealFrame className={cn(full ? 'aspect-[16/9]' : 'aspect-[4/5]')}>
          <MarkArt name={project.mark} colors={project.palette.map((s) => s.hex)} className="h-full w-full" />
        </RevealFrame>
      )}
      {item.kind === 'palette' && <Palette project={project} full={full} />}
      {item.kind === 'type' && <TypeSpecimen project={project} full={full} />}
      <figcaption className="mt-3 flex gap-3 text-sm text-muted">
        <span className="shrink-0 font-display text-accent-strong italic">
          {caseStudy.figureLabel} {String(figure).padStart(2, '0')}
        </span>
        {item.caption}
      </figcaption>
    </figure>
  )
}

function Palette({ project, full }: { project: Project; full: boolean }) {
  const { copied, copy } = useCopy(1400)
  const [last, setLast] = useState<string | null>(null)
  return (
    <div>
      <div className={cn('grid grid-cols-2 sm:grid-cols-4', full ? 'aspect-auto sm:aspect-[16/6]' : 'aspect-[4/5]')}>
        {project.palette.map((swatch) => {
          const text = readableOn(swatch.hex, theme.colors.foreground, theme.colors.background)
          const done = copied && last === swatch.hex
          return (
            <button
              key={swatch.hex + swatch.name}
              type="button"
              onClick={() => {
                setLast(swatch.hex)
                copy(swatch.hex)
              }}
              className="group relative flex min-h-40 flex-col justify-end p-4 text-left ring-1 ring-foreground/10 ring-inset sm:p-5"
              style={{ background: swatch.hex, color: text }}
              aria-label={`${swatch.name} ${swatch.hex}`}
            >
              <Copy
                aria-hidden="true"
                className="absolute top-4 right-4 size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-80 group-focus-visible:opacity-80"
              />
              <span className="font-display text-xl leading-tight italic">{swatch.name}</span>
              <span className="mt-1 flex items-center gap-1.5 font-mono text-xs tracking-wide uppercase opacity-80">
                {done ? <Check className="size-3.5" aria-hidden="true" /> : null}
                {swatch.hex}
              </span>
            </button>
          )
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {copied && last ? last : ''}
      </p>
      <p className="mt-2 text-xs text-muted">{caseStudy.paletteNote}</p>
    </div>
  )
}

function TypeSpecimen({ project, full }: { project: Project; full: boolean }) {
  const { typeface } = project
  const face = typeface.style === 'sans' ? 'font-sans font-bold tracking-[-0.04em]' : 'font-display tracking-[-0.03em]'
  const italic = typeface.style === 'serif-italic' ? 'italic' : ''
  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-8 bg-raised p-6 ring-1 ring-foreground/10 ring-inset sm:p-8',
        full ? 'min-h-[22rem] lg:aspect-[16/7] lg:flex-row lg:items-end' : 'aspect-[4/5]',
      )}
    >
      <p aria-hidden="true" className={cn(face, italic, 'leading-[0.85] text-foreground', full ? 'text-[clamp(7rem,16vw,14rem)]' : 'text-[clamp(7rem,14vw,12rem)]')}>
        {caseStudy.specimenGlyphs}
      </p>
      <div className={cn('min-w-0', full && 'lg:max-w-md')}>
        <p className={cn(face, italic, 'text-3xl leading-tight')}>{typeface.name}</p>
        <p className="mt-2 text-muted">{typeface.note}</p>
        <p aria-hidden="true" className={cn(face, italic, 'mt-6 border-t hairline pt-4 text-[0.95rem] leading-relaxed break-words text-muted')}>
          {caseStudy.specimen}
        </p>
      </div>
    </div>
  )
}
