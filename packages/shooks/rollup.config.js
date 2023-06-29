import { defineConfig } from 'rollup'
import { babel } from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

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
      name: 'vhooks',
    },
  ],
  external: ['vue'],
  plugins: [
    babel({
      babelHelpers: 'bundled',
    }),
    resolve({
      browser: true,
    }),
    typescript({
      sourceMap: false,
      declaration: true,
      declarationDir: 'dist',
      rootDir: './src',
      exclude: ['node_modules/**/*', 'dist/**/*', 'test/**/*'],
    }),
    terser(),
  ],
})
