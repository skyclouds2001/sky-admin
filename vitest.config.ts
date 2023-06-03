import { defineConfig } from 'vitest/config'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { viteMockServe as mock } from 'vite-plugin-mock'
import svgLoader from 'vite-svg-loader'
// @ts-expect-error typescript can not recognize its definition file
import ElementPlus from 'unplugin-element-plus/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

import generateEnv from './plugin/generate-env'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    legacy(),
    mock(),
    svgLoader(),
    ElementPlus({}),
    VueI18nPlugin({
      include: path.resolve(__dirname, './src/locale/**'),
    }),
    generateEnv(),
  ],
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
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    https: true,
    open: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
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
