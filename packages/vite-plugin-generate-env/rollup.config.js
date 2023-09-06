import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  input: 'index.ts',
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
  ],
  external: ['vite'],
  plugins: [
    babel({
      babelHelpers: 'bundled',
    }),
    resolve({
      extensions: ['.ts', '.tsx', '.mts', 'cts', '.js', '.jsx', '.mjs', 'cjs', '.json'],
    }),
    typescript({
      sourceMap: false,
      declaration: true,
      declarationDir: 'dist',
      rootDir: '.',
      exclude: ['node_modules/**/*', 'dist/**/*', 'test/**/*'],
    }),
    terser(),
  ],
})
