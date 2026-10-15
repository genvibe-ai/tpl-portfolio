import { contact, images, site, theme } from '../content'

/** Pushes theme.colors from content.ts into CSS variables (Tailwind's color tokens read them). */
export function applyTheme() {
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme.colors)) {
    // accentStrong → --color-accent-strong
    root.style.setProperty(`--color-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`, value)
  }
  setMeta('name', 'theme-color', theme.colors.background)
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const origin = () => site.url || window.location.origin
const absolute = (path: string) => new URL(path, origin()).href

/** Title, description and social tags for the current page (defaults come from `site`). */
export function applyHead(page: { title?: string; description?: string; image?: string } = {}) {
  const title = page.title ?? site.title
  const description = page.description ?? site.description
  document.title = title
  document.documentElement.lang = site.locale
  setMeta('name', 'description', description)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:site_name', site.name)
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:image', absolute(page.image ?? site.socialImage.src))
  setMeta('name', 'twitter:card', 'summary_large_image')
}

/** schema.org Person for search engines, built from content.ts. */
export function applyJsonLd() {
  // Only real profile links (not the placeholder platform homepages) belong in sameAs.
  const profiles = contact.socials
    .map((s) => s.href)
    .filter((href) => {
      try {
        return new URL(href).pathname.length > 1
      } catch {
        return false
      }
    })
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: origin(),
    image: absolute(images.portrait.src),
    email: `mailto:${contact.email}`,
    address: { '@type': 'PostalAddress', addressLocality: site.location },
    ...(profiles.length ? { sameAs: profiles } : {}),
  }
  let script = document.getElementById('person-jsonld')
  if (!script) {
    script = document.createElement('script')
    script.id = 'person-jsonld'
    script.setAttribute('type', 'application/ld+json')
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}
