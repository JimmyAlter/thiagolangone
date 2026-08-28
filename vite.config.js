import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const entry = (path) => fileURLToPath(new URL(path, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // Portfolio at /, the Organizador PWA at /app/.
        main: entry('./index.html'),
        app: entry('./app/index.html'),
      },
    },
  },
})
