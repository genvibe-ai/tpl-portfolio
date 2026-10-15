import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
// Self-hosted fonts: Newsreader (display serif, optical sizes + italics) and Schibsted Grotesk (text and UI).
// To swap fonts, change these imports and --font-display / --font-sans in src/index.css.
import '@fontsource-variable/newsreader/opsz.css'
import '@fontsource-variable/newsreader/opsz-italic.css'
import '@fontsource-variable/schibsted-grotesk/wght.css'
import './index.css'
import App from './App'
import { applyHead, applyJsonLd, applyTheme } from './lib/site'

// Colors, title, meta tags and the Person JSON-LD all come from src/content.ts.
applyTheme()
applyHead()
applyJsonLd()

// The page transition restores scroll positions itself (src/components/layout/PageShell.tsx).
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
