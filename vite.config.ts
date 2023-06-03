import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { viteMockServe as mock } from 'vite-plugin-mock'
import svgLoader from 'vite-svg-loader'
// @ts-expect-error typescript can not recognize its definition file
import ElementPlus from 'unplugin-element-plus/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { createHtmlPlugin as html } from 'vite-plugin-html'
import viteCompression from 'vite-plugin-compression'
import mkcert from 'vite-plugin-mkcert'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'
import visualizer from 'rollup-plugin-visualizer'
import inspect from 'vite-plugin-inspect'

import GenerateEnv from './plugin/generate-env'
import CopyFile from './plugin/copy-file'

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
    html({
      minify: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
    }),
    viteCompression(),
    mkcert(),
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
    GenerateEnv(),
    CopyFile(),
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
})
