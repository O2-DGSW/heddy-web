import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/renderer/mobile/src'),
    },
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'mobile.html'),
    },
    outDir: 'dist/mobile',
  },
})