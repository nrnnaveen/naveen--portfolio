import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = process.env.VITE_BASE_PATH?.trim() || '/'

export default defineConfig({
  plugins: [react()],
  base: base.endsWith('/') ? base : `${base}/`,
  server: { host: '0.0.0.0', port: 3000 },
  preview: { host: '0.0.0.0', port: 4173 },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
