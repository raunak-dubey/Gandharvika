import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use '/src/shared/styles/_vars.scss' as *;
        @use '/src/shared/styles/mixins.scss' as *;
        `
      }
    }
  }
})
