import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start-plugin'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    tanstackStart({
      customViteReactPlugin: true,
    }),
    react(),
  ],
})
