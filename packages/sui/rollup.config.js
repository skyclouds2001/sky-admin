import { defineConfig } from 'rollup'
import NodeResolve from '@rollup/plugin-node-resolve'
import Terser from '@rollup/plugin-terser'
import Typescript from '@rollup/plugin-typescript'
import VueJsx from '@vitejs/plugin-vue-jsx'
import PostCSS from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      globals: {
        vue: 'Vue',
      },
      name: 'vui',
    },
  ],
  external: ['vue'],
  plugins: [
    NodeResolve({
      browser: true,
      extensions: ['.ts', '.tsx', '.mts', 'cts', '.js', '.jsx', '.mjs', 'cjs', '.json'],
    }),
    VueJsx(),
    Terser(),
    Typescript({
      sourceMap: false,
      declaration: true,
      declarationDir: 'dist',
      emitDeclarationOnly: true,
      rootDir: 'src',
    }),
    PostCSS({
      extensions: ['.css'],
      minimize: true,
      plugins: [autoprefixer()],
    }),
  ],
})
