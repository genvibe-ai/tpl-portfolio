import { motion } from 'motion/react'
import { services } from '../../content'
import { pad } from '../../lib/format'
import { EASE } from '../../lib/motion'
import { Accent } from '../ui/Accent'
import { MaskReveal, Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-pad bg-surface">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="03">{services.eyebrow}</SectionLabel>
            <h2 id="services-title" className="display-xl mt-6">
              <MaskReveal>
                <Accent text={services.title} />
              </MaskReveal>
            </h2>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-muted">{services.intro}</p>
          </Reveal>
        </div>

        <ol className="mt-16 border-b hairline md:mt-24">
          {services.items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.06 }}
              className="group relative grid gap-x-6 gap-y-4 border-t hairline py-9 md:grid-cols-12 md:py-12"
            >
                {/* A vermilion rule draws across the top on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-editorial group-hover:scale-x-100"
                />
                <span className="font-display text-xl text-muted italic transition-colors duration-500 group-hover:text-accent-strong md:col-span-1">
                  {pad(i + 1)}
                </span>
                <h3 className="display-md transition-transform duration-700 ease-editorial group-hover:translate-x-2 md:col-span-4">
                  {item.title}
                </h3>
                <div className="md:col-span-5">
                  <p className="text-muted">{item.text}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.deliverables.map((d) => (
                      <li key={d} className="rounded-full border hairline px-3 py-1 text-[0.8rem] font-medium">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm md:col-span-2 md:text-right">
                  <span className="eyebrow block text-muted">{services.timelineLabel}</span>
                  <span className="mt-1.5 block font-display text-xl">{item.timeline}</span>
                </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
