/** Joins class names, skipping falsy values. */
export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

/** Content text without the *accent* markers, for titles and aria-labels. */
export const plain = (text: string) => text.replace(/\*/g, '')

/** Two-digit index: 1 → "01". */
export const pad = (n: number) => String(n).padStart(2, '0')

/** Ink or paper text for a swatch, whichever contrasts more with the hex background. */
export function readableOn(hex: string, dark: string, light: string) {
  const value = hex.replace('#', '')
  const full = value.length === 3 ? [...value].map((c) => c + c).join('') : value
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
  return luminance > 0.22 ? dark : light
}

/** The time in a time zone, e.g. "14:32". */
export function timeIn(timeZone: string, date = new Date()) {
  try {
    return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }).format(date)
  } catch {
    return ''
  }
}
