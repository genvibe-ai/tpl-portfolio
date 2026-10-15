import type { Client, WordmarkStyle } from '../../content'
import { cn } from '../../lib/format'
import { MarkGlyph } from './Mark'

/** Type treatments that make each fictional client read like its own logo. */
const styles: Record<WordmarkStyle, string> = {
  'serif-caps': 'font-display text-[1.3rem] font-medium uppercase tracking-[0.22em]',
  'serif-italic': 'font-display text-[2rem] italic tracking-[-0.02em]',
  'serif-bold': 'font-display text-[1.85rem] font-bold tracking-[-0.03em]',
  'sans-black': 'font-sans text-[1.75rem] font-black lowercase tracking-[-0.06em]',
  'sans-caps': 'font-sans text-[0.95rem] font-semibold uppercase tracking-[0.34em]',
  'sans-stack': 'font-sans text-[1.35rem] font-extrabold uppercase leading-none tracking-[-0.01em]',
}

/** A client "logo": an optional glyph plus the name set in one of the styles above. */
export function ClientWordmark({ client, className }: { client: Client; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 leading-none', className)}>
      {client.mark && (
        <MarkGlyph
          name={client.mark}
          className="size-[1.35em] shrink-0 transition-colors duration-500 group-hover:text-accent"
        />
      )}
      {client.style === 'sans-stack' ? (
        <span className="flex flex-col">
          <span className={styles['sans-stack']}>{client.name}</span>
          {client.suffix && <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.42em]">{client.suffix}</span>}
        </span>
      ) : (
        <span className={styles[client.style]}>
          {client.name}
          {client.suffix && <span className="ml-2 font-sans text-[0.55em] font-medium tracking-[0.2em] uppercase opacity-80">{client.suffix}</span>}
        </span>
      )}
    </span>
  )
}
