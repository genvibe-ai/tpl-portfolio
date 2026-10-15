import { useId } from 'react'
import type { MarkName } from '../../content'

/**
 * Abstract artwork for case studies and client logos. Pure SVG, no text.
 * MarkArt paints a 4:5 artboard from a project's palette (colors[0] is the key color);
 * MarkGlyph is a small one-color logo glyph that follows currentColor.
 */
export function MarkArt({ name, colors, className }: { name: MarkName; colors: string[]; className?: string }) {
  const [c0 = '#E8452C', c1 = '#EAE5D9', c2 = '#141414', c3 = '#F4F1EA'] = colors
  const clip = useId()
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      {name === 'vault' && (
        <>
          <rect width="400" height="500" fill={c2} />
          <path d="M96 500V292a152 152 0 0 1 304 0v208h-82V300a70 70 0 0 0-140 0v200z" fill={c0} />
          <path d="M-60 500V340a96 96 0 0 1 192 0" fill="none" stroke={c3} strokeWidth="1.5" opacity="0.9" />
          <circle cx="64" cy="76" r="9" fill={c3} />
          <path d="M40 120h48" stroke={c3} strokeWidth="1.5" />
        </>
      )}
      {name === 'hills' && (
        <>
          <rect width="400" height="500" fill={c3} />
          <path d="M150 120c60-34 150-10 168 62 18 70-34 128-96 132-70 4-124-40-128-104-2-42 22-70 56-90z" fill={c0} />
          <path d="M0 340c70-58 130-70 196-26 56 38 126 32 204-36v222H0z" fill={c1} />
          <path d="M0 420c80-66 150-62 214-14 52 40 114 34 186-24v118H0z" fill={c2} />
        </>
      )}
      {name === 'columns' && (
        <>
          <rect width="400" height="500" fill={c1} />
          {Array.from({ length: 13 }, (_, i) => (
            <path key={i} d={`M${40 + i * 26.67} 36v428`} stroke={c2} strokeWidth="1" opacity="0.35" />
          ))}
          <rect x="40" y="56" width="160" height="236" fill={c0} />
          <rect x="226.7" y="56" width="133.3" height="14" fill={c2} />
          <rect x="226.7" y="84" width="106.7" height="14" fill={c2} />
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x="226.7" y={136 + i * 17} width={i % 4 === 3 ? 80 : 133.3} height="5" fill={c2} opacity="0.7" />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x="40" y={322 + i * 17} width={i === 6 ? 70 : 160} height="5" fill={c2} opacity="0.7" />
          ))}
          <rect x="226.7" y="322" width="133.3" height="110" fill={c2} opacity="0.85" />
          <circle cx="352" cy="460" r="7" fill={c3} />
        </>
      )}
      {name === 'cards' && (
        <>
          <rect width="400" height="500" fill={c1} />
          <rect x="56" y="62" width="288" height="176" rx="30" fill={c0} />
          <circle cx="292" cy="112" r="20" fill="#FFFFFF" opacity="0.92" />
          <path d="M56 206c58-50 112-56 168-18 40 26 80 22 120-8v28a30 30 0 0 1-30 30H86a30 30 0 0 1-30-30z" fill="#FFFFFF" opacity="0.28" />
          <rect x="56" y="258" width="136" height="112" rx="26" fill="#FFFFFF" opacity="0.75" />
          <circle cx="108" cy="314" r="20" fill={c1} />
          <circle cx="130" cy="314" r="20" fill={c1} opacity="0.6" />
          <rect x="208" y="258" width="136" height="112" rx="26" fill={c2} />
          <path d="M224 336c22-24 44-24 64-6s38 16 44 4" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
          <rect x="56" y="388" width="288" height="66" rx="26" fill={c3} />
          <path d="M80 432c26-18 50-20 76-6s56 10 82-8 52-14 80 2" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        </>
      )}
      {name === 'shapes' && (
        <>
          <rect width="400" height="500" fill={c2} />
          <circle cx="132" cy="138" r="72" fill={c1} />
          <path d="M226 40h136a68 68 0 0 1-136 0z" fill={c0} />
          <path d="M40 460V350c104 0 178-60 212-146 22-56 58-86 108-90v346z" fill={c0} />
          <path d="M40 304h80" stroke={c1} strokeWidth="2" />
        </>
      )}
      {name === 'vessel' && (
        <>
          <defs>
            <clipPath id={clip}>
              <path d="M184 92h32v18c0 22 6 38 22 56 34 38 50 82 46 130-6 66-40 106-84 106s-78-40-84-106c-4-48 12-92 46-130 16-18 22-34 22-56z" />
            </clipPath>
          </defs>
          <rect width="400" height="500" fill={c1} />
          <rect x="0" y="402" width="400" height="98" fill={c2} opacity="0.28" />
          <path d="M184 92h32v18c0 22 6 38 22 56 34 38 50 82 46 130-6 66-40 106-84 106s-78-40-84-106c-4-48 12-92 46-130 16-18 22-34 22-56z" fill={c0} />
          <rect x="0" y="318" width="400" height="200" fill="#F7F2EA" clipPath={`url(#${clip})`} />
          <rect x="176" y="84" width="48" height="12" rx="5" fill={c0} />
          <path d="M318 402c-18 0-26-14-26-34s10-30 16-40c4-7 4-14 4-22h12c0 8 0 15 4 22 6 10 16 20 16 40s-8 34-26 34z" fill={c3} />
        </>
      )}
      {name === 'sun' && (
        <>
          <rect width="400" height="500" fill={c1} />
          <path d="M60 330a140 140 0 0 1 280 0z" fill={c0} />
          <path d="M40 360h320M80 396h240M120 432h160" stroke={c2} strokeWidth="6" />
        </>
      )}
      {name === 'amphora' && (
        <>
          <rect width="400" height="500" fill={c1} />
          <path d="M180 80h40v30c40 26 64 70 64 120 0 70-40 130-84 190-44-60-84-120-84-190 0-50 24-94 64-120z" fill={c0} />
          <path d="M150 140c-30 0-40 30-24 52M250 140c30 0 40 30 24 52" fill="none" stroke={c2} strokeWidth="8" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

/** A one-color logo glyph (24×24) for the client wordmarks. */
export function MarkGlyph({ name, className }: { name: MarkName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      {name === 'vault' && <path d="M2 22V12a10 10 0 0 1 20 0v10h-6v-9.5a4 4 0 0 0-8 0V22z" />}
      {name === 'hills' && (
        <>
          <circle cx="15" cy="8" r="5" />
          <path d="M1 22v-5c4-4 7-4 10-1.5S17 18 23 13v9z" />
        </>
      )}
      {name === 'columns' && <path d="M3 3h4v18H3zM10 3h4v12h-4zM17 3h4v15h-4z" />}
      {name === 'cards' && (
        <>
          <rect x="2" y="3" width="15" height="11" rx="3.5" />
          <rect x="7" y="10" width="15" height="11" rx="3.5" opacity="0.55" />
        </>
      )}
      {name === 'shapes' && (
        <>
          <circle cx="7" cy="7" r="5" />
          <path d="M12 22a10 10 0 0 1 10-10v10z" />
        </>
      )}
      {name === 'vessel' && <path d="M10 2h4v3c0 1.5.6 2.6 1.6 3.8C18 11.4 19 14 18.6 17 18 20.4 15.4 22 12 22s-6-1.6-6.6-5C5 14 6 11.4 8.4 8.8 9.4 7.6 10 6.5 10 5z" />}
      {name === 'sun' && (
        <>
          <path d="M3 15a9 9 0 0 1 18 0z" />
          <path d="M2 18h20v2H2z" />
        </>
      )}
      {name === 'amphora' && <path d="M10 2h4v2.5c2.8 1.7 4.4 4.4 4.4 7.6 0 4.2-2.7 7.6-6.4 9.9-3.7-2.3-6.4-5.7-6.4-9.9 0-3.2 1.6-5.9 4.4-7.6z" />}
    </svg>
  )
}
