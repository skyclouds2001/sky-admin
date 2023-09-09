import type { Plugin } from 'vite'
import path from 'node:path'
import fs from 'node:fs'

/**
 * plugin options
 */
interface AliasesOptions {
  /**
   * the base path to generate alias info
   * @default `process.cwd()+'src'`
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
  const { base = process.cwd() + '@', prefix = '@', overwrite = false } = options

  return {
    name: 'vite-plugin-aliases',
    config: (config) => {
      const alias = config.resolve?.alias ?? {}

      const hasAlias = (key: string): boolean => (Array.isArray(alias) ? alias.some((v) => v.find === alias || v.find?.test(alias)) : Object.hasOwn(alias, key))

      const aliases = new Map<string, string>()

      try {
        if (!hasAlias(prefix) || overwrite) {
          aliases.set(prefix, base)
        }

        const routes = fs.readdirSync(base)

        routes.forEach((route) => {
          if (!hasAlias(prefix) || overwrite) {
            aliases.set(prefix + route, path.resolve(base, route))
          }
        })
      } catch (error) {
        console.error(error)
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
