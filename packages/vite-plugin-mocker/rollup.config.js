import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  input: ['index.ts', 'client.ts', 'mocker.ts'],
  output: [
    {
      dir: 'dist',
      format: 'es',
    },
    {
      dir: 'dist',
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
      // declaration: true,
      // declarationDir: 'dist',
      rootDir: '.',
      exclude: ['node_modules/**/*', 'dist/**/*', 'test/**/*'],
    }),
    terser(),
  ],
})
