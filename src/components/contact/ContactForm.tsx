import { ArrowRight, ArrowUpRight, Loader2 } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { contact, contactPage } from '../../content'
import { cn } from '../../lib/format'
import { EASE } from '../../lib/motion'
import { Accent } from '../ui/Accent'
import { buttonClasses, RollLabel } from '../ui/Button'

type Fields = {
  name: string
  email: string
  company: string
  services: string[]
  budget: string
  timeline: string
  message: string
}
type ErrorKey = 'name' | 'email' | 'message'

const EMPTY: Fields = { name: '', email: '', company: '', services: [], budget: '', timeline: '', message: '' }
const f = contactPage.form

function validate(v: Fields) {
  const errors: Partial<Record<ErrorKey, string>> = {}
  if (!v.name.trim()) errors.name = f.errors.name
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = f.errors.email
  if (v.message.trim().length < 10) errors.message = f.errors.message
  return errors
}

/** The enquiry as a pre-filled email, offered after sending (and the fallback until a form service is connected). */
function mailtoFor(v: Fields) {
  const lines = [
    `${f.name.label}: ${v.name}`,
    `${f.email.label}: ${v.email}`,
    v.company && `${f.company.label}: ${v.company}`,
    v.services.length > 0 && `${f.services.label} ${v.services.join(', ')}`,
    v.budget && `${f.budget.label}: ${v.budget}`,
    v.timeline && `${f.timeline.label}: ${v.timeline}`,
    '',
    v.message,
  ].filter((line) => line !== false && line !== undefined) as string[]
  const subject = `${f.success.mailSubject}: ${v.name}`
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}

/**
 * Front-end only. To receive enquiries, send `values` to a form service or a database
 * inside handleSubmit (where the comment is) and keep this UI.
 */
export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const id = useId()
  const reduce = useReducedMotion()

  // The confirmation mounts after the form fades out and is shorter than it:
  // bring it into view and move focus to it.
  const onConfirmation = useCallback(
    (heading: HTMLHeadingElement | null) => {
      if (!heading) return
      heading.focus({ preventScroll: true })
      if (heading.getBoundingClientRect().top < 80) heading.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
    },
    [reduce],
  )

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (submitted) setErrors(validate(next))
  }

  const toggleService = (service: string) =>
    update('services', values.services.includes(service) ? values.services.filter((s) => s !== service) : [...values.services, service])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const found = validate(values)
    setErrors(found)
    const first = (['name', 'email', 'message'] as const).find((k) => found[k])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setStatus('sending')
    // Connect a form service or database here, then show the confirmation.
    window.setTimeout(() => setStatus('sent'), 900)
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setSubmitted(false)
    setStatus('idle')
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'sent' ? (
        <motion.div
          key="sent"
          role="status"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="border-t border-foreground pt-10"
        >
          <svg viewBox="0 0 48 48" className="size-12 text-accent" aria-hidden="true">
            <motion.circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: EASE }} />
            <motion.path d="M15 24.5l6 6 12-13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease: EASE, delay: 0.5 }} />
          </svg>
          <h2 ref={onConfirmation} tabIndex={-1} className="display-lg mt-8 outline-none">
            <Accent text={f.success.title.replace('{name}', values.name.trim().split(/\s+/)[0] || values.name)} />
          </h2>
          <p className="lead mt-5 max-w-xl text-muted">{f.success.text}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={mailtoFor(values)} className="group inline-flex items-center gap-2 font-semibold text-accent-strong">
              <span className="link-draw">{f.success.mailto}</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
            <button type="button" onClick={reset} className="link-under text-sm font-medium">
              {f.success.reset}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="space-y-10"
        >
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-6">
            <Field id={`${id}-name`} label={f.name.label} error={errors.name}>
              <input
                id={`${id}-name`}
                name="name"
                type="text"
                autoComplete="name"
                placeholder={f.name.placeholder}
                value={values.name}
                onChange={(e) => update('name', e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${id}-name-error` : undefined}
                className="field"
              />
            </Field>
            <Field id={`${id}-email`} label={f.email.label} error={errors.email}>
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder={f.email.placeholder}
                value={values.email}
                onChange={(e) => update('email', e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${id}-email-error` : undefined}
                className="field"
              />
            </Field>
          </div>

          <Field id={`${id}-company`} label={f.company.label}>
            <input
              id={`${id}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              placeholder={f.company.placeholder}
              value={values.company}
              onChange={(e) => update('company', e.target.value)}
              className="field"
            />
          </Field>

          <fieldset>
            <legend className="eyebrow text-muted">{f.services.label}</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {f.services.options.map((option) => (
                <Chip
                  key={option}
                  type="checkbox"
                  name="services"
                  label={option}
                  checked={values.services.includes(option)}
                  onChange={() => toggleService(option)}
                />
              ))}
            </div>
          </fieldset>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-6">
            <fieldset>
              <legend className="eyebrow text-muted">{f.budget.label}</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {f.budget.options.map((option) => (
                  <Chip
                    key={option}
                    type="radio"
                    name="budget"
                    label={option}
                    checked={values.budget === option}
                    onChange={() => update('budget', option)}
                  />
                ))}
              </div>
            </fieldset>
            <Field id={`${id}-timeline`} label={f.timeline.label}>
              <div className="relative">
                <select
                  id={`${id}-timeline`}
                  name="timeline"
                  value={values.timeline}
                  onChange={(e) => update('timeline', e.target.value)}
                  className={cn('field cursor-pointer appearance-none pr-8', !values.timeline && 'text-foreground/60')}
                >
                  <option value="" disabled>
                    —
                  </option>
                  {f.timeline.options.map((option) => (
                    <option key={option} value={option} className="text-foreground">
                      {option}
                    </option>
                  ))}
                </select>
                <ArrowRight aria-hidden="true" className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 rotate-90 text-muted" />
              </div>
            </Field>
          </div>

          <Field id={`${id}-message`} label={f.message.label} error={errors.message}>
            <textarea
              id={`${id}-message`}
              name="message"
              rows={5}
              placeholder={f.message.placeholder}
              value={values.message}
              onChange={(e) => update('message', e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? `${id}-message-error` : undefined}
              className="field resize-y"
            />
          </Field>

          <button type="submit" disabled={status === 'sending'} className={cn(buttonClasses('primary'), 'disabled:cursor-wait disabled:opacity-80')}>
            {status === 'sending' ? (
              <>
                <span>{f.sending}</span>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              </>
            ) : (
              <>
                <RollLabel>{f.submit}</RollLabel>
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-45" strokeWidth={1.75} aria-hidden="true" />
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-muted">
        {label}
      </label>
      <div className="mt-1">{children}</div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 text-sm font-medium text-accent-strong"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/** A checkbox or radio dressed as a pill; the real input stays in the tab order. */
function Chip({
  type,
  name,
  label,
  checked,
  onChange,
}: {
  type: 'checkbox' | 'radio'
  name: string
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="relative cursor-pointer">
      <input type={type} name={name} value={label} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={cn(
          'inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-300',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-strong',
          checked ? 'border-foreground bg-foreground text-background' : 'border-foreground/25 hover:border-foreground',
        )}
      >
        {label}
      </span>
    </label>
  )
}
