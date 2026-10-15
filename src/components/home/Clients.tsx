import { clients } from '../../content'
import { Accent } from '../ui/Accent'
import { ClientWordmark } from '../ui/ClientWordmark'
import { MaskReveal, Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

/** A logo wall of fictional clients: hairline grid, each name set like its own wordmark. */
export function Clients() {
  return (
    <section aria-labelledby="clients-title" className="pb-24 md:pb-36">
      <div className="container-page">
        <div className="grid gap-8 border-t hairline pt-14 lg:grid-cols-12 lg:pt-20">
          <SectionLabel index="02" className="lg:col-span-4">
            {clients.eyebrow}
          </SectionLabel>
          <h2 id="clients-title" className="display-md lg:col-span-8">
            <MaskReveal>
              <Accent text={clients.title} />
            </MaskReveal>
          </h2>
        </div>

        <Reveal>
          <ul className="mt-12 grid grid-cols-2 border-t border-l hairline md:mt-16 lg:grid-cols-4">
            {clients.items.map((client) => (
              <li
                key={client.name}
                className="group flex aspect-[16/9] items-center justify-center border-r border-b hairline px-4 text-foreground/65 transition-colors duration-500 hover:bg-raised hover:text-foreground sm:aspect-[2/1]"
              >
                <ClientWordmark client={client} className="scale-[0.82] sm:scale-100" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
