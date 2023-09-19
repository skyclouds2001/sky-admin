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
}

/**
 * a vite plugin for auto generate aliases config
 * @param options plugin options
 * @returns plugin instance
 */
const Aliases = (options: AliasesOptions = {}): Plugin => {
  const logger = createLogger()

  const { root = process.cwd(), base = 'src', prefix = '@', overwrite = false } = options

  return {
    name: 'vite-plugin-aliases',
    config: (config) => {
      const alias = config.resolve?.alias ?? {}

      const hasAlias = (key: string): boolean => (Array.isArray(alias) ? alias.some((v) => v.find === key || v.find?.test(key)) : Object.hasOwn(alias, key))

      const aliases = new Map<string, string>()

      const basis = path.resolve(root, base)

      try {
        if (fs.statSync(basis).isDirectory() && (!hasAlias(prefix) || overwrite)) {
          aliases.set(prefix, basis)
        }

        const routes = fs.readdirSync(basis)

        routes.forEach((route) => {
          const src = path.resolve(basis, route)

          if (fs.statSync(src).isDirectory() && (!hasAlias(prefix + route) || overwrite)) {
            aliases.set(prefix + route, src)
          }
        })

        logger.info(aliases)
      } catch (error) {
        logger.info(String(error))
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
