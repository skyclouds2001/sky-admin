import { defineConfig } from 'vite'
import path from 'node:path'
import fs from 'node:fs'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { viteMockServe as mock } from 'vite-plugin-mock'
import svgLoader from 'vite-svg-loader'
import ElementPlus from 'unplugin-element-plus/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA as pwa } from 'vite-plugin-pwa'
import { createHtmlPlugin as html } from 'vite-plugin-html'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import { checker } from 'vite-plugin-checker'
import alias from 'vite-plugin-aliases'
import copyAssets from 'vite-plugin-copy-assets'
import utils from 'vite-plugin-utils'

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
    pwa({
      registerType: 'autoUpdate',
      manifest: {
        start_url: '/',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        lang: 'zh-CN',
      },
    }),
    compression(),
    visualizer({
      filename: 'report.html',
      title: 'report',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    checker({
      vueTsc: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx,vue}"',
      },
      stylelint: {
        lintCommand: 'stylelint "./src/**/*.{vue,css,scss}"',
      },
    }),
    alias() as unknown as any,
    copyAssets([]),
    utils(),
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
  define: {
    __BUILD_TIME__: `'${new Date().toLocaleString()}'`,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    https: {
      key: fs.readFileSync('C:/Users/CHENSY/AppData/Local/mkcert/localhost+1-key.pem'),
      cert: fs.readFileSync('C:/Users/CHENSY/AppData/Local/mkcert/localhost+1.pem'),
    },
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
    https: {
      key: fs.readFileSync('C:/Users/CHENSY/AppData/Local/mkcert/localhost+1-key.pem'),
      cert: fs.readFileSync('C:/Users/CHENSY/AppData/Local/mkcert/localhost+1.pem'),
    },
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
})
