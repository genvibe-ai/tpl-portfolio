import { useCallback, useEffect, useRef, useState } from 'react'

/** Copies text to the clipboard and reports `copied` for a moment afterwards. */
export function useCopy(timeout = 1800) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
      } catch {
        // Older browsers or insecure contexts: fall back to a hidden textarea.
        const area = document.createElement('textarea')
        area.value = text
        area.setAttribute('readonly', '')
        area.style.position = 'fixed'
        area.style.opacity = '0'
        document.body.appendChild(area)
        area.select()
        try {
          document.execCommand('copy')
        } catch {
          /* ignore */
        }
        area.remove()
      }
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), timeout)
    },
    [timeout],
  )

  return { copied, copy }
}
