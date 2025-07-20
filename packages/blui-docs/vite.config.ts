import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // In development, import directly from source files for instant feedback
      'blui': path.resolve(__dirname, '../blui-core/src/index.ts')
    }
  },
  server: {
    port: 5173
  }
})
