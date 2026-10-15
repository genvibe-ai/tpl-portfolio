import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        // Libraries (React, React Router, motion, icons) in their own chunk: smaller app bundle, cached across edits.
        codeSplitting: { groups: [{ name: 'vendor', test: /[\\/]node_modules[\\/]/ }] },
      },
    },
  },
})
