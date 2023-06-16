import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      formats: ['es', 'cjs', 'umd', 'iife'],
      name: 'vite_plugin_generate_env',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vite'],
      output: {
        globals: {
          vite: 'vite',
        },
      },
    },
  },
})
