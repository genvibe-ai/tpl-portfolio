import { useEffect } from 'react'
import { applyHead } from '../lib/site'

/** Sets the document title, description and social image for a page. */
export function usePageMeta(meta: { title?: string; description?: string; image?: string }) {
  const { title, description, image } = meta
  useEffect(() => {
    applyHead({ title, description, image })
  }, [title, description, image])
}
