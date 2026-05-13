import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  root: resolve(__dirname, 'src/renderer/desktop'),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/renderer/desktop/src'),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: resolve(__dirname, 'dist/desktop'),
    emptyOutDir: true,
  },
})