import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { viteMockServe as mock } from 'vite-plugin-mock'
import mkcert from 'vite-plugin-mkcert'
import ElementPlus from 'unplugin-element-plus/vite'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'
import visualizer from 'rollup-plugin-visualizer'

import generateBuildTime from './plugin/generate-build-time'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    legacy(),
    mock(),
    mkcert(),
    ElementPlus({}),
    eslint({
      cache: true,
      cacheLocation: 'node_modules/.vite/.eslintcache',
    }),
    stylelint({
      cache: true,
      cacheLocation: 'node_modules/.vite/.stylelintcache',
    }),
    visualizer({
      filename: 'report.html',
      title: 'report',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    generateBuildTime(),
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
    strictPort: true,
    https: true,
    open: true,
  },
})
