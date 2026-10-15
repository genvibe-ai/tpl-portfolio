/* =============================================================================
 *  INES VALTOR · SITE CONTENT
 *  This is the ONE file to edit. Every word, color, link, image path and case
 *  study on the site lives here; components in src/ only read it.
 *
 *  Conventions
 *  • *word*   Wrap words in single asterisks for the italic serif accent,
 *             e.g. "An identity cut from *a single fold*".
 *  • Images   WebP files in public/images/, referenced as "/images/<file>.webp".
 *             Keep width/height equal to the real file (prevents layout shift).
 *  • Colors   theme.colors become CSS variables and Tailwind classes at startup:
 *             bg-background, bg-surface, bg-raised, text-foreground, text-muted,
 *             text-accent / bg-accent, text-accent-strong, text-accent-foreground,
 *             bg-inverse, text-inverse-foreground, text-inverse-muted.
 *  • Pages    Home (/), one case study per project (/work/<slug>), About (/about),
 *             Contact (/contact). Add a project to `projects` and its page exists.
 *  • Fictional: the designer, clients, quotes, numbers and awards are invented.
 * ========================================================================== */

export type Img = { src: string; alt: string; width: number; height: number }
export type Link = { label: string; href: string }
export type Stat = { value: string; label: string }
export type Swatch = { name: string; hex: string }

/** Abstract SVG marks drawn in src/components/ui/Mark.tsx (vermilion artwork for case studies and client logos). */
export type MarkName = 'vault' | 'hills' | 'columns' | 'cards' | 'shapes' | 'vessel' | 'sun' | 'amphora'

/** Each case study's image sequence. Photos can reuse one file with a different crop (`focus` = CSS object-position). */
export type GalleryItem =
  | { kind: 'image'; image: Img; caption: string; layout: 'full' | 'half'; focus?: string; aspect?: 'landscape' | 'portrait' | 'wide' }
  | { kind: 'mark' | 'palette' | 'type'; caption: string; layout: 'full' | 'half' }

export type Project = {
  slug: string
  client: string
  /** Case study headline. *word* = italic accent. */
  title: string
  discipline: string
  year: number
  role: string
  duration: string
  scope: string[]
  summary: string
  cover: Img
  /** CSS object-position for the cover in cropped frames, e.g. "50% 40%". */
  coverFocus?: string
  mark: MarkName
  palette: Swatch[]
  typeface: { name: string; note: string; style: 'serif' | 'serif-italic' | 'sans' }
  challenge: string[]
  approach: { text: string[]; points: string[] }
  outcome: { text: string[]; stats: Stat[] }
  gallery: GalleryItem[]
}

export type WordmarkStyle = 'serif-caps' | 'serif-italic' | 'serif-bold' | 'sans-black' | 'sans-caps' | 'sans-stack'
export type Client = { name: string; style: WordmarkStyle; mark?: MarkName; suffix?: string }
export type Testimonial = { quote: string; name: string; role: string; avatar: Img; project?: string }

/* ── Colors ─────────────────────────────────────────────────────────────── */
export const theme = {
  colors: {
    background: '#F4F1EA', // paper: page background
    surface: '#EAE5D9', // deeper paper: alternate bands, image mats
    raised: '#FBFAF6', // cards and form fields
    foreground: '#141414', // ink: main text
    muted: '#5C574F', // secondary text (keep at least 4.5:1 on background and surface)
    accent: '#E8452C', // vermilion: italic accents, dots, large type, button fills
    accentStrong: '#B12F19', // deeper vermilion for small text and links on paper (4.5:1+)
    accentForeground: '#141414', // text on vermilion fills
    inverse: '#141414', // dark bands (contact block, footer, page curtain)
    inverseForeground: '#F4F1EA', // text on dark bands
    inverseMuted: '#A39D91', // secondary text on dark bands (4.5:1+)
  },
}

/* ── Images (public/images) ─────────────────────────────────────────────── */
export const images = {
  identity: {
    src: '/images/folio-identity.webp',
    alt: 'Ferro stationery on warm grey stone: two business cards, a letterhead and an envelope, each cropping the same vermilion vault curve differently',
    width: 1400,
    height: 934,
  },
  packaging: {
    src: '/images/folio-packaging.webp',
    alt: 'Three Ondina coffee pouches, two kraft and one ink black, printed with black hills and a vermilion sun shape, on a concrete café counter',
    width: 1400,
    height: 934,
  },
  editorial: {
    src: '/images/folio-editorial.webp',
    alt: 'An open Marginalia spread on a dark desk: a full-page black-and-white portrait beside a page of quiet grey layout blocks',
    width: 1400,
    height: 934,
  },
  app: {
    src: '/images/folio-app.webp',
    alt: 'A hand holding a phone with the Nimbo app’s soft coral, lavender, sage and amber cards against a vermilion wall',
    width: 1400,
    height: 934,
  },
  posters: {
    src: '/images/folio-posters.webp',
    alt: 'A visitor in a bright gallery looking at three framed Halftone Festival posters of bold vermilion and ink shapes',
    width: 1400,
    height: 934,
  },
  ceramics: {
    src: '/images/folio-ceramics.webp',
    alt: 'Handmade Brasa vases in off-white and vermilion glaze, some half-dipped, arranged on a stone plinth in soft light',
    width: 1400,
    height: 934,
  },
  portrait: {
    src: '/images/folio-portrait.webp',
    alt: 'Ines Valtor in a black turtleneck, standing in her sunlit Porto studio in front of a wall of mood boards',
    width: 900,
    height: 900,
  },
  avatar1: { src: '/images/av-1.webp', alt: 'Amara Okafor', width: 320, height: 320 },
  avatar2: { src: '/images/av-2.webp', alt: 'Kenji Mori', width: 320, height: 320 },
  avatar3: { src: '/images/av-3.webp', alt: 'Marta Quintela', width: 320, height: 320 },
  avatar4: { src: '/images/av-4.webp', alt: 'Henrik Lund', width: 320, height: 320 },
  avatar6: { src: '/images/av-6.webp', alt: 'Rohan Mehta', width: 320, height: 320 },
  avatar7: { src: '/images/av-7.webp', alt: 'Niamh Costa', width: 320, height: 320 },
} satisfies Record<string, Img>

/* ── Brand & SEO ────────────────────────────────────────────────────────── */
export const site = {
  name: 'Ines Valtor',
  /** The nav and footer wordmark. The final character is set in the accent color. */
  logo: 'Ines Valtor.',
  role: 'Brand & product designer',
  title: 'Ines Valtor · Independent brand & product designer in Porto',
  description:
    'Ines Valtor is an independent brand and product designer in Porto. Identity, packaging, editorial and digital products for founders and cultural organizations.',
  /** Live domain for SEO, e.g. "https://www.inesvaltor.example". Leave empty to use the current domain. */
  url: '',
  locale: 'en',
  socialImage: images.identity,
  /** Shown in the nav pill, hero and contact page. */
  availability: 'Booking projects from January 2027',
  location: 'Porto, Portugal',
  /** IANA time zone for the live studio clock. */
  timezone: 'Europe/Lisbon',
  timezoneLabel: 'Porto',
  copyright: '© 2026 Ines Valtor. All rights reserved.',
}

export const contact = {
  email: 'hello@inesvaltor.example',
  studio: ['Studio 4, Bonfim', 'Porto, Portugal'],
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Behance', href: 'https://www.behance.net/' },
    { label: 'Dribbble', href: 'https://dribbble.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ] satisfies Link[],
}

/* ── Interface labels ───────────────────────────────────────────────────── */
export const ui = {
  skipToContent: 'Skip to content',
  openMenu: 'Menu',
  closeMenu: 'Close',
  primaryNav: 'Primary',
  backToTop: 'Back to top',
  copyEmail: 'Copy email',
  copied: 'Copied',
  localTime: 'Local time',
  scroll: 'Scroll',
  viewCase: 'View case',
  readCase: 'Read the case study',
  nextProject: 'Next project',
  previous: 'Previous',
  next: 'Next',
  gridView: 'Grid',
  indexView: 'Index',
  workViews: 'Work layout',
  /** Page names shown on the transition curtain and in browser titles (home shows site.name, case studies the client). */
  pageNames: { about: 'About', contact: 'Contact', notFound: 'Not found' },
}

/* ── Navigation ─────────────────────────────────────────────────────────── */
export const nav = {
  /** Shown first in the mobile menu. */
  home: { label: 'Home', href: '/' },
  links: [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ] satisfies Link[],
  cta: { label: 'Start a project', href: '/contact' },
}

/* ── Home: hero ─────────────────────────────────────────────────────────── */
export const hero = {
  eyebrow: 'Ines Valtor — Independent designer, Porto',
  /** Two lines. "{image}" is the inline image pill, "{word}" the rotating italic word. */
  lines: ['Brands {image} and products', 'people {word}'],
  /** The rotating word, in order. Each one pairs with the project image at the same position. */
  words: ['remember.', 'trust.', 'fall for.', 'return to.', 'choose.', 'keep.'],
  intro:
    'I help founders, makers and cultural institutions find the shape of an idea, then design the identity, packaging, print and product around it. Eleven years, sixty-odd brands, one rule: nothing generic leaves the studio.',
  primaryCta: { label: 'See selected work', href: '/#work' },
  secondaryCta: { label: 'Start a project', href: '/contact' },
  currently: { label: 'Currently', text: 'Designing the identity for an independent bookshop in Porto.' },
  facts: [
    { value: '11', label: 'years of practice' },
    { value: '64', label: 'brands launched' },
    { value: '18', label: 'awards and mentions' },
  ] satisfies Stat[],
  meta: ['Identity', 'Packaging', 'Editorial', 'Digital product'],
}

/* ── Projects (one case study page each, at /work/<slug>) ───────────────── */
export const projects: Project[] = [
  {
    slug: 'ferro-arquitetos',
    client: 'Ferro Arquitetos',
    title: 'An identity cut from *a single curve*',
    discipline: 'Brand identity',
    year: 2026,
    role: 'Creative direction, identity design',
    duration: '10 weeks',
    scope: ['Brand strategy', 'Logo system', 'Stationery', 'Signage', 'Guidelines'],
    summary:
      'A Porto architecture practice known for its vaulted concrete roofs wanted a brand as precise as its buildings. We built the whole system from one gesture: the curve of a vault, cropped differently on every piece.',
    cover: images.identity,
    coverFocus: '45% 50%',
    mark: 'vault',
    palette: [
      { name: 'Primer', hex: '#E8452C' },
      { name: 'Concrete', hex: '#BDB6A9' },
      { name: 'Paper', hex: '#F4F1EA' },
      { name: 'Graphite', hex: '#2B2A28' },
    ],
    typeface: { name: 'Ferro Grotesk', note: 'A squared-off grotesk cut for signage, in two weights', style: 'sans' },
    challenge: [
      'Ferro had grown from two partners to twenty-six people working in three countries, but it still introduced itself with a wordmark drawn in an afternoon in 2009. Pitches were being won on the work and lost on the first impression.',
      'The partners wanted something unmistakable that would never compete with the architecture it framed.',
    ],
    approach: {
      text: [
        'We spent the first two weeks on site visits and in the archive, tracing the profiles of Ferro’s roofs. The mark is a single vault curve that is never shown whole: every card, letterhead and envelope crops it differently, so the set reads like one building seen from many angles.',
      ],
      points: [
        'A mark that is a crop, not a logo: no two pieces show the same view',
        'One vermilion, borrowed from the site primer paint, on less than a fifth of any surface',
        'A two-weight type system so the architecture always speaks first',
        'Stationery on 400gsm uncoated stock with the curve blind-debossed',
      ],
    },
    outcome: {
      text: [
        'The identity launched with the practice’s largest competition entry to date, which it won. Ferro now runs the system in-house across proposals, site hoardings and its first monograph.',
      ],
      stats: [
        { value: '3', label: 'competitions won in the first year' },
        { value: '+41%', label: 'shortlist rate on public tenders' },
        { value: '1', label: 'curve that runs the whole system' },
      ],
    },
    gallery: [
      { kind: 'image', image: images.identity, caption: 'Business cards and envelope, each a different crop', layout: 'half', focus: '14% 50%', aspect: 'portrait' },
      { kind: 'mark', caption: 'The mark: one vault, never shown whole', layout: 'half' },
      { kind: 'palette', caption: 'Palette', layout: 'full' },
      { kind: 'type', caption: 'Typography', layout: 'half' },
      { kind: 'image', image: images.identity, caption: 'Letterhead on 400gsm uncoated stock', layout: 'half', focus: '82% 45%', aspect: 'portrait' },
    ],
  },
  {
    slug: 'ondina-coffee',
    client: 'Ondina Coffee',
    title: 'Coffee bags that read *at arm’s length*',
    discipline: 'Packaging',
    year: 2025,
    role: 'Packaging design, art direction',
    duration: '8 weeks',
    scope: ['Packaging system', 'Illustration', 'Print production', 'Retail display'],
    summary:
      'A specialty roaster by the sea in Matosinhos needed bags that hold their own on a crowded shelf and still say exactly where each coffee comes from, without a single sticker.',
    cover: images.packaging,
    coverFocus: '50% 55%',
    mark: 'hills',
    palette: [
      { name: 'Vermilion', hex: '#E8452C' },
      { name: 'Kraft', hex: '#C49A6C' },
      { name: 'Roast', hex: '#1B1A18' },
      { name: 'Crema', hex: '#EFE3CF' },
    ],
    typeface: { name: 'Ondina Serif', note: 'A warm text serif for origin notes, set small and generous', style: 'serif' },
    challenge: [
      'Ondina roasts twelve single origins a year and was hand-labeling plain kraft bags. In shops the bags disappeared next to louder brands, and nobody could tell a washed Ethiopian from a natural Brazilian without picking the bag up.',
    ],
    approach: {
      text: [
        'Every origin got its own landscape: the hills of the farm it comes from, traced from elevation data, under a vermilion sun. Light roasts sit on kraft, dark roasts on ink black, so a shopper can read roast and origin from two meters away, and the range grows by adding landscapes, not new bags.',
      ],
      points: [
        'Two base bags and one spot color cut print costs by a third',
        'Each farm’s hills drawn from real elevation data',
        'Brewing notes moved to the gusset, so the front stays quiet',
        'Compostable film and water-based inks throughout',
      ],
    },
    outcome: {
      text: [
        'The range relaunched in 140 independent shops across Portugal and Spain. Sell-through doubled in the first season, and the landscapes have become the roaster’s language on cups, aprons and the café menu.',
      ],
      stats: [
        { value: '2×', label: 'sell-through in the first season' },
        { value: '140', label: 'independent stockists' },
        { value: '−33%', label: 'print cost per bag' },
      ],
    },
    gallery: [
      { kind: 'image', image: images.packaging, caption: 'Light roast on kraft, dark roast on ink black', layout: 'half', focus: '38% 55%', aspect: 'portrait' },
      { kind: 'mark', caption: 'Each origin’s hills, under one vermilion sun', layout: 'half' },
      { kind: 'palette', caption: 'Palette', layout: 'full' },
      { kind: 'type', caption: 'Typography', layout: 'half' },
      { kind: 'image', image: images.packaging, caption: 'One spot color, two base bags', layout: 'half', focus: '80% 55%', aspect: 'portrait' },
    ],
  },
  {
    slug: 'marginalia',
    client: 'Marginalia',
    title: 'A quieter grid for a *loud* art quarterly',
    discipline: 'Editorial design',
    year: 2025,
    role: 'Art direction, editorial design',
    duration: '6 months',
    scope: ['Redesign', 'Grid & typography', 'Cover system', 'Production guide'],
    summary:
      'Marginalia publishes long interviews with artists who rarely give them. The redesign gives the portraits room to breathe and makes thirty-page conversations a pleasure to read.',
    cover: images.editorial,
    coverFocus: '50% 45%',
    mark: 'columns',
    palette: [
      { name: 'Ink', hex: '#141414' },
      { name: 'Newsprint', hex: '#E9E5DC' },
      { name: 'Graphite', hex: '#6E6A63' },
      { name: 'Vermilion', hex: '#E8452C' },
    ],
    typeface: { name: 'Marginalia Text', note: 'One serif for everything, with a true italic for questions', style: 'serif-italic' },
    challenge: [
      'Twelve years of additions had left the magazine with four typefaces, seven column structures and a pull quote on every spread. Readers loved the content and complained about the reading.',
      'Advertisers had started asking for the back pages, because nobody could find anything in the middle.',
    ],
    approach: {
      text: [
        'We stripped the magazine back to one serif, one grotesk and a single twelve-column grid that flexes into three reading widths. Portraits run full-bleed and uncropped, pull quotes became a rare event, and the interviews sit in a generous measure that makes thirty pages feel like ten.',
      ],
      points: [
        'A twelve-column grid with three reading widths',
        'Full-bleed, uncropped portraits: no photograph boxed in by text',
        'A cover system built on one photograph and one word',
        'A production guide so a team of two can lay out an issue in a week',
      ],
    },
    outcome: {
      text: [
        'The first redesigned issue sold out its print run in nine days. Subscriptions rose by a third over the year, and the magazine picked up its first design award.',
      ],
      stats: [
        { value: '9 days', label: 'to sell out the first issue' },
        { value: '+34%', label: 'subscriptions in twelve months' },
        { value: '4 → 2', label: 'typefaces in the whole magazine' },
      ],
    },
    gallery: [
      { kind: 'image', image: images.editorial, caption: 'A whole page for every portrait', layout: 'half', focus: '24% 50%', aspect: 'portrait' },
      { kind: 'mark', caption: 'Twelve columns, three reading widths', layout: 'half' },
      { kind: 'palette', caption: 'Palette', layout: 'full' },
      { kind: 'type', caption: 'Typography', layout: 'half' },
      { kind: 'image', image: images.editorial, caption: 'The grid at work on an opening spread', layout: 'half', focus: '68% 50%', aspect: 'portrait' },
    ],
  },
  {
    slug: 'nimbo',
    client: 'Nimbo',
    title: 'A money app that *calms down* when you open it',
    discipline: 'Product design',
    year: 2024,
    role: 'Lead product designer',
    duration: '5 months',
    scope: ['Product strategy', 'UX & UI', 'Design system', 'Prototyping'],
    summary:
      'Nimbo helps freelancers set aside tax, plan for slow months and get paid on time. The redesign replaced a dense dashboard with a few honest cards and one clear answer: how much is really yours.',
    cover: images.app,
    coverFocus: '48% 45%',
    mark: 'cards',
    palette: [
      { name: 'Coral', hex: '#EF7B63' },
      { name: 'Lavender', hex: '#C9C0F0' },
      { name: 'Sage', hex: '#86A595' },
      { name: 'Amber', hex: '#F4A73E' },
    ],
    typeface: { name: 'Nimbo Sans', note: 'Tabular figures first: every number lines up', style: 'sans' },
    challenge: [
      'Nimbo’s first app showed everything at once: twelve charts, three balances and a notification for every transaction. Freelancers opened it in a panic and closed it in a worse one.',
      'Two in three new users had stopped opening the app within a month.',
    ],
    approach: {
      text: [
        'Interviews with forty freelancers showed they wanted one number they could trust. We rebuilt the home screen around “Yours to spend”, with tax, savings and upcoming bills set aside as soft, colored cards. Every screen was tested as a paper prototype before it became a component.',
      ],
      points: [
        'One headline number instead of three balances',
        'Color-coded cards for tax, savings and bills',
        'Notifications cut by 80% and grouped into a weekly note',
        'A sixty-component design system shared with engineering',
      ],
    },
    outcome: {
      text: [
        'Month-one retention rose from 34% to 61% and the app store rating went from 3.1 to 4.7. The design system now runs the web app and the new business accounts.',
      ],
      stats: [
        { value: '61%', label: 'month-one retention, up from 34%' },
        { value: '4.7', label: 'app store rating, up from 3.1' },
        { value: '−80%', label: 'notifications sent' },
      ],
    },
    gallery: [
      { kind: 'image', image: images.app, caption: 'The home screen: one number you can trust', layout: 'half', focus: '47% 45%', aspect: 'portrait' },
      { kind: 'mark', caption: 'Tax, savings and bills as soft cards', layout: 'half' },
      { kind: 'palette', caption: 'Palette', layout: 'full' },
      { kind: 'type', caption: 'Typography', layout: 'full' },
    ],
  },
  {
    slug: 'halftone-festival',
    client: 'Halftone Festival',
    title: 'Three nights of music, *one shape* at a time',
    discipline: 'Campaign & posters',
    year: 2024,
    role: 'Design, art direction',
    duration: '12 weeks',
    scope: ['Campaign identity', 'Poster series', 'Wayfinding', 'Motion kit'],
    summary:
      'A new-music festival in a former textile factory needed a campaign that works on a wheat-pasted wall, a phone screen and a twelve-meter banner. We built it from three shapes, one per night.',
    cover: images.posters,
    coverFocus: '50% 45%',
    mark: 'shapes',
    palette: [
      { name: 'Vermilion', hex: '#E8452C' },
      { name: 'Ink', hex: '#141414' },
      { name: 'Paper', hex: '#F4F1EA' },
      { name: 'Smoke', hex: '#9A958C' },
    ],
    typeface: { name: 'Halftone Display', note: 'Heavy and narrow, so dates read from across the street', style: 'sans' },
    challenge: [
      'Halftone books artists most people have not heard of yet. With a small budget and no headliner to put on the poster, the campaign had to make people curious enough to buy a ticket for a night they could not predict.',
    ],
    approach: {
      text: [
        'Each night got its own composition of a few shapes, a circle, a half-circle and a rising curve, cut from the profiles of the factory’s old loom parts and printed in vermilion, ink and paper tones. The posters say almost nothing, so the city started talking about them. The shapes carried through tickets, wristbands, stage screens and signage.',
      ],
      points: [
        'One composition per night, reused on every touchpoint',
        'Screen-printed posters in an edition of 600',
        'A motion kit for social built from the same shapes',
        'Wayfinding painted straight onto the factory floor',
      ],
    },
    outcome: {
      text: [
        'For the first time in the festival’s history, all three nights sold out, two weeks before the doors opened. The city’s design museum has since added the poster series to its collection.',
      ],
      stats: [
        { value: '3/3', label: 'nights sold out' },
        { value: '600', label: 'screen-printed posters' },
        { value: '2 wks', label: 'early sell-out' },
      ],
    },
    gallery: [
      { kind: 'image', image: images.posters, caption: 'Night one, at full size', layout: 'half', focus: '18% 50%', aspect: 'portrait' },
      { kind: 'mark', caption: 'Circle, half-circle, rising curve', layout: 'half' },
      { kind: 'palette', caption: 'Palette', layout: 'full' },
      { kind: 'type', caption: 'Typography', layout: 'half' },
      { kind: 'image', image: images.posters, caption: 'Nights two and three', layout: 'half', focus: '82% 45%', aspect: 'portrait' },
    ],
  },
  {
    slug: 'brasa-ceramics',
    client: 'Brasa Ceramics',
    title: 'A studio brand fired *at the same heat* as the clay',
    discipline: 'Identity & e-commerce',
    year: 2023,
    role: 'Identity, web design, photo direction',
    duration: '9 weeks',
    scope: ['Identity', 'Art direction', 'Online shop', 'Packaging'],
    summary:
      'Two potters in the Minho valley make small batches of vases in a vermilion glaze they mix themselves. They needed a brand and an online shop that feel as handmade as the pieces.',
    cover: images.ceramics,
    coverFocus: '50% 50%',
    mark: 'vessel',
    palette: [
      { name: 'Glaze', hex: '#E8452C' },
      { name: 'Bisque', hex: '#EDE4D6' },
      { name: 'Stone', hex: '#8F877B' },
      { name: 'Kiln', hex: '#2A2522' },
    ],
    typeface: { name: 'Brasa Serif', note: 'A soft, warm serif with ink traps that echo thrown clay', style: 'serif' },
    challenge: [
      'Brasa sold out at every market it attended but had no way to sell in between. Its feed was full of beautiful pieces photographed on kitchen tables, and every drop went to whoever happened to be online.',
    ],
    approach: {
      text: [
        'The identity is set in a warm serif with the studio’s own glaze as the only color. I directed a photography style of single pieces on stone plinths in raking light, and designed a shop around monthly drops with a waiting list, so the studio sets the pace, not the algorithm.',
      ],
      points: [
        'A palette mixed from the studio’s own glaze recipe',
        'Photo direction: one piece, one plinth, morning light',
        'A drop-based shop with a waiting list and live stock counts',
        'Shipping boxes cut from the studio’s offcut cardboard',
      ],
    },
    outcome: {
      text: [
        'The first online drop sold out in four minutes. Brasa now ships to nineteen countries and has moved into a larger studio with a second kiln.',
      ],
      stats: [
        { value: '4 min', label: 'to sell out the first drop' },
        { value: '19', label: 'countries shipped to' },
        { value: '2,300', label: 'people on the waiting list' },
      ],
    },
    gallery: [
      { kind: 'image', image: images.ceramics, caption: 'Glaze mixed by hand, batch by batch', layout: 'half', focus: '22% 60%', aspect: 'portrait' },
      { kind: 'mark', caption: 'The vessel mark', layout: 'half' },
      { kind: 'palette', caption: 'Palette', layout: 'full' },
      { kind: 'type', caption: 'Typography', layout: 'half' },
      { kind: 'image', image: images.ceramics, caption: 'Half-dipped pieces for the first drop', layout: 'half', focus: '80% 60%', aspect: 'portrait' },
    ],
  },
]

/* ── Home: selected work ────────────────────────────────────────────────── */
export const work = {
  eyebrow: 'Selected work',
  title: 'Six projects I’d *happily do again*',
  intro:
    'Identity, packaging, editorial and product work for clients who wanted something with a point of view. Each one has a full case study.',
  /** Columns in the index view. */
  indexColumns: { number: 'No.', project: 'Project', discipline: 'Discipline', year: 'Year' },
}

/* ── Home: clients ──────────────────────────────────────────────────────── */
export const clients = {
  eyebrow: 'Clients & collaborators',
  title: 'Trusted by *founders, studios and institutions* across Europe',
  items: [
    { name: 'Ferro', style: 'serif-caps', mark: 'vault' },
    { name: 'ondina', style: 'sans-black', mark: 'hills' },
    { name: 'Marginalia', style: 'serif-italic' },
    { name: 'nimbo', style: 'sans-black', mark: 'cards' },
    { name: 'Halftone', style: 'sans-caps', mark: 'shapes' },
    { name: 'Brasa', style: 'serif-bold', mark: 'vessel' },
    { name: 'Orla', style: 'sans-stack', suffix: 'Hotels', mark: 'sun' },
    { name: 'Talha', style: 'serif-caps', suffix: 'Wines', mark: 'amphora' },
  ] satisfies Client[],
}

/* ── Home: services ─────────────────────────────────────────────────────── */
export const services = {
  eyebrow: 'Services',
  title: 'Four disciplines, *one point of view*',
  intro:
    'Most projects mix two or three of these. You work with me directly from the first workshop to the final file, and I bring in trusted specialists for code, copy and photography when the job needs them.',
  timelineLabel: 'Typical timeline',
  items: [
    {
      title: 'Brand identity',
      text: 'Positioning, logo systems, typography, color and guidelines your team can actually use.',
      deliverables: ['Positioning', 'Logo system', 'Type & color', 'Guidelines'],
      timeline: '8–12 weeks',
    },
    {
      title: 'Packaging',
      text: 'Packaging systems that read on the shelf, scale across a range and survive the print run.',
      deliverables: ['Range architecture', 'Structural design', 'Print production', 'Retail display'],
      timeline: '6–10 weeks',
    },
    {
      title: 'Editorial & print',
      text: 'Magazines, books, posters and campaigns with a strong grid and a stronger point of view.',
      deliverables: ['Art direction', 'Grids & typography', 'Cover systems', 'Production'],
      timeline: '4–16 weeks',
    },
    {
      title: 'Digital product',
      text: 'Apps and websites that feel like the brand, designed and tested with the people who use them.',
      deliverables: ['UX research', 'Product UI', 'Design systems', 'Prototyping'],
      timeline: '8–20 weeks',
    },
  ],
}

/* ── Home: short about ──────────────────────────────────────────────────── */
export const aboutTeaser = {
  eyebrow: 'About',
  title: 'I’m Ines. I design *the shape of an idea,* then everything around it.',
  text: [
    'Before going independent in 2021, I spent six years in studios in Lisbon and London, designing for publishers, retailers and technology companies.',
    'Today I take on six to eight projects a year, so every client works with the same designer from the first workshop to the final file.',
  ],
  caption: 'In the studio, Porto, 2026',
  facts: [
    { value: '11', label: 'years designing' },
    { value: '64', label: 'brands launched' },
    { value: '9', label: 'countries' },
  ] satisfies Stat[],
  cta: { label: 'More about me', href: '/about' },
}

/* ── Home: testimonials ─────────────────────────────────────────────────── */
export const testimonials = {
  eyebrow: 'Kind words',
  title: 'In their *own words*',
  items: [
    {
      quote:
        'Ines found the one idea in our work we had never managed to put into words, then built everything from it. Clients now recognize a Ferro proposal from across the room.',
      name: 'Marta Quintela',
      role: 'Founding partner, Ferro Arquitetos',
      avatar: images.avatar3,
      project: 'ferro-arquitetos',
    },
    {
      quote:
        'We asked for new bags and got a language. Our baristas explain the origins with Ines’s shapes now. Best money we have spent since the roaster.',
      name: 'Kenji Mori',
      role: 'Co-founder, Ondina Coffee',
      avatar: images.avatar2,
      project: 'ondina-coffee',
    },
    {
      quote:
        'She took things away until the magazine could breathe again. Our readers noticed before we told anyone that anything had changed.',
      name: 'Henrik Lund',
      role: 'Editor-in-chief, Marginalia',
      avatar: images.avatar4,
      project: 'marginalia',
    },
    {
      quote:
        'Equal parts strategist and craftsperson. Every review with Ines left us with fewer screens and a clearer product, and our retention chart shows it.',
      name: 'Amara Okafor',
      role: 'Head of Product, Nimbo',
      avatar: images.avatar1,
      project: 'nimbo',
    },
    {
      quote:
        'The posters said almost nothing and sold every ticket. People peeled them off the walls, which I have decided to take as a compliment.',
      name: 'Rohan Mehta',
      role: 'Festival director, Halftone',
      avatar: images.avatar6,
      project: 'halftone-festival',
    },
    {
      quote:
        'She photographed our vases like sculpture and built a shop that feels like our studio. The first drop sold out in four minutes.',
      name: 'Niamh Costa',
      role: 'Co-founder, Brasa Ceramics',
      avatar: images.avatar7,
      project: 'brasa-ceramics',
    },
  ] satisfies Testimonial[],
}

/* ── Contact block (home page and footer area) ──────────────────────────── */
export const closing = {
  eyebrow: 'Contact',
  title: 'Have something worth *making?* Let’s talk.',
  text: 'I’m booking projects from January 2027. Tell me what you’re working on and I’ll reply within two working days.',
  cta: { label: 'Start a project', href: '/contact' },
  marquee: ['Now booking January 2027', 'Brand identity', 'Packaging', 'Editorial & print', 'Digital product'],
}

/* ── Footer ─────────────────────────────────────────────────────────────── */
export const footer = {
  sitemapTitle: 'Sitemap',
  socialTitle: 'Elsewhere',
  studioTitle: 'Studio',
  links: [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ] satisfies Link[],
  /** The giant footer name. Move the pointer over it: the letters gain weight. */
  wordmark: 'Ines Valtor',
}

/* ── Case study page labels ─────────────────────────────────────────────── */
export const caseStudy = {
  meta: { client: 'Client', role: 'Role', year: 'Year', scope: 'Scope', duration: 'Duration' },
  sections: { challenge: 'Challenge', approach: 'Approach', outcome: 'Outcome' },
  galleryTitle: 'Selected *details*',
  figureLabel: 'Fig.',
  paletteNote: 'Click a swatch to copy its hex code',
  specimenGlyphs: 'Aa',
  specimen: 'Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789',
  breadcrumb: 'Work',
  breadcrumbLabel: 'Breadcrumb',
  of: 'of',
}

/* ── About page ─────────────────────────────────────────────────────────── */
export const about = {
  eyebrow: 'About',
  title: 'I make brands that know *what they want to say.*',
  intro:
    'I’m Ines Valtor, an independent brand and product designer working from a small studio in Porto. I help founders, makers and cultural organizations find the shape of their idea, then design the identity, packaging, print and product that carry it into the world.',
  storyTitle: 'The short version',
  story: [
    'I grew up above my parents’ print shop in Braga, folding leaflets after school and learning that a good layout is mostly about what you leave out. I studied communication design in Porto and spent my twenties in studios in Lisbon and London, designing magazines, packaging and, eventually, apps.',
    'In 2021 I went independent to work more closely with fewer clients. I take on six to eight projects a year, from a single identity to a full brand and product system, and I stay on each one from the first workshop to the final file.',
    'When I’m not designing, I’m pulling posters on an old screen-printing press, collecting ceramics I can’t afford and swimming in a very cold Atlantic.',
  ],
  principlesTitle: 'How I work',
  principles: [
    { title: 'Idea before logo', text: 'We agree on what the brand believes before anyone draws a thing.' },
    { title: 'Systems, then surfaces', text: 'A few strong rules make a thousand good layouts possible.' },
    { title: 'Show it early', text: 'Rough and shared on Tuesday beats polished and late on Friday.' },
    { title: 'Made to last', text: 'No trends with a shelf life shorter than your print run.' },
  ],
  experienceTitle: 'Experience',
  experience: [
    { period: '2021 — Now', role: 'Independent designer', place: 'Porto', text: 'Brand, packaging, editorial and product design for founders, studios and cultural organizations across Europe.' },
    { period: '2019 — 2021', role: 'Design lead', place: 'Parallel Field, London', text: 'Led identity and digital work for publishers and consumer brands, and started the studio’s design systems practice.' },
    { period: '2017 — 2019', role: 'Senior designer', place: 'Casa Quarto, Lisbon', text: 'Packaging and editorial design for food, wine and hospitality clients.' },
    { period: '2015 — 2017', role: 'Designer', place: 'Northbound Press, Lisbon', text: 'Book covers, magazine layouts and a crash course in print production.' },
    { period: '2011 — 2015', role: 'BA Communication Design', place: 'Porto School of Art & Design', text: 'Graduated with distinction, with a thesis on hand-painted shop signs in northern Portugal.' },
  ],
  awardsTitle: 'Awards & recognition',
  awards: [
    { year: '2025', title: 'Ink & Grid Biennial', category: 'Best magazine redesign', project: 'Marginalia' },
    { year: '2025', title: 'Halberd Packaging Prize', category: 'Gold, food & drink', project: 'Ondina Coffee' },
    { year: '2024', title: 'Atlantic Type Prize', category: 'Shortlist, poster series', project: 'Halftone Festival' },
    { year: '2024', title: 'Pixel & Paper Awards', category: 'App of the year, finance', project: 'Nimbo' },
    { year: '2023', title: 'Saltwater Craft Prize', category: 'Identity, small business', project: 'Brasa Ceramics' },
    { year: '2022', title: 'New Voices Index', category: '30 designers under 35', project: 'Independent practice' },
  ],
  resume: {
    title: 'The *paper* version',
    text: 'A one-page résumé with clients, experience, education and awards.',
    /** Replace public/resume.pdf with your own file (keep the name, or change this path). */
    href: '/resume.pdf',
    label: 'Download résumé',
    meta: 'PDF · 1 page',
  },
  portraitCaption: 'Porto, 2026',
}

/* ── Contact page ───────────────────────────────────────────────────────── */
export const contactPage = {
  eyebrow: 'Contact',
  title: 'Tell me about *the thing* you’re making.',
  intro:
    'Fill in the form or write to me directly. I reply to every message within two working days, usually with a few questions and a time for a call.',
  form: {
    name: { label: 'Your name', placeholder: 'Ana Ferreira' },
    email: { label: 'Email', placeholder: 'ana@studio.example' },
    company: { label: 'Company or project', placeholder: 'Optional' },
    services: { label: 'What do you need?', options: ['Brand identity', 'Packaging', 'Editorial & print', 'Digital product', 'Not sure yet'] },
    budget: { label: 'Budget', options: ['Under €10k', '€10–25k', '€25–50k', '€50k+'] },
    timeline: { label: 'Timeline', options: ['As soon as possible', 'In 1–3 months', 'In 3–6 months', 'Just exploring'] },
    message: {
      label: 'About the project',
      placeholder: 'What are you making, who is it for, and what would success look like?',
    },
    submit: 'Send message',
    sending: 'Sending',
    errors: {
      name: 'Please tell me your name.',
      email: 'Please enter a valid email address.',
      message: 'A sentence or two about the project helps a lot.',
    },
    success: {
      title: 'Thank you, *{name}.*',
      text: 'Your message is in. I’ll reply within two working days, usually with a few questions and a time for a call.',
      mailto: 'Prefer email? Send it from your inbox',
      mailSubject: 'New project enquiry',
      reset: 'Send another message',
    },
  },
  emailTitle: 'Write directly',
  socialTitle: 'Elsewhere',
  studioTitle: 'Studio',
  availabilityTitle: 'Availability',
  responseNote: 'Replies within two working days',
  stepsTitle: 'What happens next',
  steps: [
    'A short reply with a few questions about the project.',
    'A thirty-minute call to see if we’re a good fit.',
    'A written proposal with scope, timeline and fee within a week.',
  ],
}

/* ── 404 page ───────────────────────────────────────────────────────────── */
export const notFound = {
  eyebrow: '404',
  title: 'This page is *out of print.*',
  text: 'The link may be old, or the page may have moved. Everything else is still here.',
  primary: { label: 'Back to home', href: '/' },
  secondary: { label: 'See selected work', href: '/#work' },
}
