import { useSyncExternalStore } from 'react'

/** True while the media query matches, e.g. useMediaQuery('(hover: hover) and (pointer: fine)'). */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Devices with a real mouse or trackpad (hover previews and the custom cursor only run here). */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
