import { defineConfig } from 'vite'
import path from 'node:path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      formats: ['es', 'cjs', 'umd', 'iife'],
      name: 'vite_plugin_copy_file',
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
