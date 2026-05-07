import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/memory-lane-game/',
  build: {
    outDir: 'dist',
  },
})
