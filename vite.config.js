import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BASE = '/memory-lane-game/'

export default defineConfig({
  plugins: [react(), {
    name: 'inject-favicon',
    transformIndexHtml(html) {
      return html.replace('</head>', '<link rel="icon" href="' + BASE + 'favicon.svg" type="image/svg+xml"></head>')
    }
  }],
  base: BASE,
  build: {
    outDir: 'dist',
  },
})
