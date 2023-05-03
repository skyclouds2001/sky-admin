import { defineConfig } from 'vitest/config'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { viteMockServe as mock } from 'vite-plugin-mock'
import mkcert from 'vite-plugin-mkcert'
import svgLoader from 'vite-svg-loader'
import ElementPlus from 'unplugin-element-plus/vite'

import generateEnv from './plugin/generate-env'

export default defineConfig({
  plugins: [vue(), vueJsx(), legacy(), mock(), mkcert(), svgLoader(), ElementPlus({}), generateEnv()],
  resolve: {
    alias: {
      '~': __dirname,
      '@': path.resolve(__dirname, './src/'),
    },
  },
  css: {
    devSourcemap: true,
  },
  server: {
    strictPort: true,
    https: true,
    open: true,
  },
  test: {
    root: '.',
    watch: false,
    environment: 'jsdom',
    include: ['tests/{unit,components}/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    reporters: ['default', 'html'],
    coverage: {
      provider: 'c8',
      enabled: true,
    },
    deps: {
      inline: ['element-plus', 'echarts'],
    },
    cache: {},
  },
})
