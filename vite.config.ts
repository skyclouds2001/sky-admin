import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { viteMockServe as mock } from 'vite-plugin-mock'
import mkcert from 'vite-plugin-mkcert'
import svgLoader from 'vite-svg-loader'
import ElementPlus from 'unplugin-element-plus/vite'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'
import visualizer from 'rollup-plugin-visualizer'
import inspect from 'vite-plugin-inspect'

import generateEnv from './plugin/generate-env'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    legacy(),
    mock(),
    mkcert(),
    svgLoader(),
    ElementPlus({}),
    eslint({
      cache: true,
      cacheLocation: 'node_modules/.eslint/.eslintcache',
    }),
    stylelint({
      cache: true,
      cacheLocation: 'node_modules/.stylelint/.stylelintcache',
    }),
    visualizer({
      filename: 'report.html',
      title: 'report',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    inspect(),
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
    strictPort: true,
    https: true,
    open: true,
  },
})
