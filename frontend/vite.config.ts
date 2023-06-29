import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { viteMockServe as mock } from 'vite-plugin-mock'
import GenerateEnv from 'vite-plugin-generate-env'
import svgLoader from 'vite-svg-loader'
// @ts-expect-error typescript can not recognize its definition file
import ElementPlus from 'unplugin-element-plus/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { createHtmlPlugin as html } from 'vite-plugin-html'
import viteCompression from 'vite-plugin-compression'
import CopyFile from 'vite-plugin-copy-file'
import mkcert from 'vite-plugin-mkcert'
import { visualizer } from 'rollup-plugin-visualizer'
import inspect from 'vite-plugin-inspect'
import checker from 'vite-plugin-checker'

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
    visualizer({
      filename: 'report.html',
      title: 'report',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    inspect(),
    checker({
      vueTsc: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx,vue}"',
      },
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.{vue,css,sass,scss,less,styl,stylus}',
      },
    }),
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
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
    https: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
