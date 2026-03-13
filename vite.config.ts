import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/bud-2-design-system/",
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) return 'vendor-recharts'
            if (id.includes('@phosphor-icons')) return 'vendor-icons'
            return 'vendor'
          }

          if (id.includes('/src/docs/sections/')) {
            return 'docs-sections'
          }

          if (id.includes('/src/components/')) {
            return 'docs-components'
          }
        },
      },
    },
  },
})
