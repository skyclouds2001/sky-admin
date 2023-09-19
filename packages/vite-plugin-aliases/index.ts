import { createFilter, createLogger, type Plugin } from 'vite'
import path from 'node:path'
import fs from 'node:fs'

/**
 * plugin options
 */
interface AliasesOptions {
  /**
   * the root path of the project
   * @default process.cwd()
   */
  root?: string

  /**
   * the base path to generate alias info, should be an relative path to `options.root`
   * @default 'src'
   */
  base?: string

  /**
   * the symbol of the alias
   * @default '@'
   */
  prefix?: string

  /**
   * whether to overwrite alias if has been existed in
   * @default false
   */
  overwrite?: boolean

  /**
   * A minimatch pattern, or array of patterns, that dictionaries should work on
   * @default []
   */
  include?: string | RegExp | Array<string | RegExp>

  /**
   * A minimatch pattern, or array of patterns, that dictionaries should not work on
   * @default []
   */
  exclude?: string | RegExp | Array<string | RegExp>
}

/**
 * a vite plugin for auto generate aliases config
 * @param options plugin options
 * @returns plugin instance
 */
const Aliases = (options: AliasesOptions = {}): Plugin => {
  const { root = process.cwd(), base = 'src', prefix = '@', overwrite = false, include = [], exclude = [] } = options

  const filter = createFilter(include, exclude)

  const logger = createLogger()

  return {
    name: 'vite-plugin-aliases',
    version: '0.0.0',
    config: (config) => {
      const alias = config.resolve?.alias ?? {}

      const hasAlias = (key: string): boolean => (Array.isArray(alias) ? alias.some((v) => v.find === key || v.find?.test(key)) : Object.hasOwn(alias, key))

      const aliases = new Map<string, string>()

      const basis = path.resolve(root, base)

      try {
        if (filter(basis) && fs.statSync(basis).isDirectory() && (!hasAlias(prefix) || overwrite)) {
          aliases.set(prefix, basis)
        }

        const routes = fs.readdirSync(basis)

        routes.forEach((route) => {
          const src = path.resolve(basis, route)

          if (filter(src) && fs.statSync(src).isDirectory() && (!hasAlias(prefix + route) || overwrite)) {
            aliases.set(prefix + route, src)
          }
        })
      } catch (error) {
        logger.error(String(error))
      }

      return {
        resolve: {
          alias: Object.fromEntries(aliases),
        },
      }
    },
  }
}

export default Aliases
