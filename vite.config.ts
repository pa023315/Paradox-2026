import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        entrovia2000pv: 'entrovia2000pv/index.html',
        laphriaguitar: 'laphriaguitar/index.html',
      },
    },
  },
})
