import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    root: '.',
    include: ['**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,fleet,vscode,git}/**', '**/{vite,vitest}.config.*'],
    watch: false,
    environment: 'jsdom',
    reporters: ['default', 'html'],
    coverage: {
      provider: 'v8',
      enabled: true,
    },
    alias: {
      '@': path.resolve(__dirname, './frontend/src/'),
    },
    cache: {},
  },
})
