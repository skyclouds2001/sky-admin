import type { Plugin } from 'vite'
import path from 'node:path'
import fs from 'node:fs'

interface AliasesOptions {
  root?: string
  dir?: string
  prefix?: string
}

/**
 * 
 * @param options plugin options
 * @returns plugin instance
 */
const Aliases = (options: AliasesOptions = {}): Plugin => {
  const { root = process.cwd(), dir = 'src', prefix = '@' } = options

  return {
    name: 'vite-plugin-aliases',
    config: () => {
      const aliases = new Map<string, string>()

      const base = path.resolve(root, dir)

      try {
        aliases.set(prefix, base)

        const routes = fs.readdirSync(base)

        routes.forEach((route) => {
          aliases.set(prefix + route, path.resolve(base, route))
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
