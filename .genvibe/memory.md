## What this app is
Ines Valtor: GenVibe portfolio template for an independent brand and product designer (person, clients, quotes, numbers fictional). Vite 8, React 19, TypeScript, Tailwind CSS 4, motion, React Router 7. No backend, no env vars.

## Built so far
- Home: hero (rotating italic word + inline image pill), Selected work (grid with cursor badge, or index with floating preview), client wordmarks, services, short about, testimonials carousel. The contact CTA lives in the footer.
- /work/:slug case study per project: meta, hero image, Challenge/Approach/Outcome, gallery (photo crops, SVG mark art, palette, type specimen), client quote, next project.
- /about (story, principles, experience timeline, awards, résumé PDF), /contact (front-end form, success state with mailto), 404.
- Ink curtain page transitions naming the destination; scroll restored on back.

## Design
- Colors (content.ts theme.colors): paper #F4F1EA, surface #EAE5D9, raised #FBFAF6, ink #141414, muted #5C574F, vermilion #E8452C (large type, fills), accentStrong #B12F19 (small accent text), dark bands #141414.
- Fonts: Newsreader Variable (display serif, italics as vermilion accents) + Schibsted Grotesk Variable (body, UI).
- Square image frames, pill buttons, hairline rules, "(01)" section labels, paper grain on body.
- Motion: masked line rises, clip-path image reveals, letter-roll word, footer wordmark gains weight near the pointer. All respect prefers-reduced-motion.

## Structure
- src/content.ts: all copy, colors, nav, projects (case studies), testimonials, image paths with alt and width/height.
- src/App.tsx: routes. src/pages/: Home, CaseStudy, About, Contact, NotFound.
- src/components/layout/: Nav, PageShell (curtain, scroll restore), Footer, Wordmark. home/: Hero, RotatingWord, SelectedWork, Clients, Services, AboutTeaser, Testimonials. case/GalleryPanel. contact/ContactForm. ui/: Accent (*word* italics), Reveal, Button, SmartLink, SectionLabel, Mark (SVG art), ClientWordmark.
- src/index.css: tokens and utilities (display-*, eyebrow, container-page, field). src/lib/site.ts applies colors, meta and JSON-LD.
- public/images/*.webp, public/resume.pdf, public/favicon.svg.

## User preferences & rules
- Edit src/content.ts first; never hard-code copy or hex colors in components.
- Keep the design system: fonts, color roles, *accent* italics, motion with reduced-motion fallbacks.
- New project = new entry in projects[] (its page appears). Images: WebP ≤250 KB, real width/height.
- Vermilion text only at large sizes; small accent text uses accentStrong.

## Open issues & next ideas
- Contact form is front-end only: send values to a form service or Supabase in ContactForm handleSubmit.
- Replace public/resume.pdf; set site.url for SEO.
- Hosts must serve index.html for /work/*, /about, /contact (genvibe.app does).
- Ideas: journal/blog, case-study video, CMS for projects.
