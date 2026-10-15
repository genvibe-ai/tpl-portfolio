import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { CopyEmailButton } from '../components/layout/Footer'
import { useEnterDelay } from '../components/layout/PageShell'
import { ContactForm } from '../components/contact/ContactForm'
import { Accent } from '../components/ui/Accent'
import { MaskReveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { contact, contactPage, site, ui } from '../content'
import { useLocalTime } from '../hooks/useLocalTime'
import { usePageMeta } from '../hooks/usePageMeta'
import { pad } from '../lib/format'
import { EASE } from '../lib/motion'

export default function Contact() {
  usePageMeta({ title: `${ui.pageNames.contact} · ${site.name}`, description: contactPage.intro })
  const enter = useEnterDelay()
  const time = useLocalTime(site.timezone)
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay: enter + delay },
  })

  return (
    <section aria-labelledby="contact-title" className="container-page pt-28 pb-24 md:pt-36 md:pb-36">
      <motion.div {...fade(0.05)}>
        <SectionLabel>{contactPage.eyebrow}</SectionLabel>
      </motion.div>
      <h1 id="contact-title" className="display-xl mt-6 max-w-[15ch]">
        <MaskReveal immediate delay={enter + 0.1}>
          <Accent text={contactPage.title} />
        </MaskReveal>
      </h1>
      <motion.p {...fade(0.3)} className="lead mt-8 max-w-[40rem] text-muted">
        {contactPage.intro}
      </motion.p>

      <div className="mt-16 grid gap-16 border-t hairline pt-12 md:mt-20 lg:grid-cols-12 lg:gap-6">
        <motion.div {...fade(0.4)} className="lg:col-span-7">
          <ContactForm />
        </motion.div>

        <motion.aside {...fade(0.5)} className="space-y-10 lg:col-span-4 lg:col-start-9">
          <div>
            <h2 className="eyebrow text-muted">{contactPage.emailTitle}</h2>
            <a href={`mailto:${contact.email}`} className="link-under mt-3 inline-block font-display text-[1.6rem] leading-tight break-all">
              {contact.email}
            </a>
            <div className="mt-4">
              <CopyEmailButton />
            </div>
          </div>

          <div className="border-t hairline pt-8">
            <h2 className="eyebrow text-muted">{contactPage.availabilityTitle}</h2>
            <p className="mt-3 flex items-center gap-2.5 font-medium">
              <span className="live-dot" aria-hidden="true" />
              {site.availability}
            </p>
            <p className="mt-1.5 text-sm text-muted">{contactPage.responseNote}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t hairline pt-8">
            <div>
              <h2 className="eyebrow text-muted">{contactPage.studioTitle}</h2>
              <address className="mt-3 space-y-0.5 not-italic">
                {contact.studio.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
              <p className="mt-2 text-sm text-muted tabular-nums">
                {ui.localTime} {time}
              </p>
            </div>
            <div>
              <h2 className="eyebrow text-muted">{contactPage.socialTitle}</h2>
              <ul className="mt-3 space-y-1.5">
                {contact.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1">
                      <span className="link-draw">{s.label}</span>
                      <ArrowUpRight className="size-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-surface p-6 sm:p-7">
            <h2 className="font-display text-2xl">{contactPage.stepsTitle}</h2>
            <ol className="mt-5 space-y-4">
              {contactPage.steps.map((step, i) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-2 text-[0.95rem]">
                  <span className="font-display text-accent-strong italic">{pad(i + 1)}</span>
                  <span className="text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
