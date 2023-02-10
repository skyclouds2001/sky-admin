import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'

export default defineConfig({
  plugins: [vue(), vueJsx(), legacy(), eslint(), stylelint()],
  css: {
    postcss: 'postcss.config.js',
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
})
