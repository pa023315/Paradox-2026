import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        entrovia2000pv: resolve(__dirname, 'entrovia2000pv/index.html'),
        laphriaguitar: resolve(__dirname, 'laphriaguitar/index.html'),
        laphria666: resolve(__dirname, 'laphria666/index.html'),
        sashimi: resolve(__dirname, 'Sashimi/index.html'),
        boss: resolve(__dirname, 'Boss/index.html'),
        captain: resolve(__dirname, 'Captain/index.html'),
        meow: resolve(__dirname, 'meow/index.html'),
        quiz: resolve(__dirname, 'quiz/index.html'),
        drawing: resolve(__dirname, 'drawing/index.html'),
      },
    },
  },
})
