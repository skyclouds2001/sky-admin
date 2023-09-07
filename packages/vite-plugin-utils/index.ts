import type { Plugin } from 'vite'

/**
 * plugin options
 */
interface UtilsOptions {
  /**
   * whether generate environment env of build time
   * @default true
   */
  buildTime?: boolean

  /**
   * whether enable  cross-origin isolation state mode
   * @default true
   */
  crossOriginIsolated?: boolean
}

/**
 * a plugin for maintain fantastic utils
 * @param options plugin options
 * @returns plugin instance
 */
const Utils = (options: UtilsOptions = {}): Plugin => {
  const { buildTime = true, crossOriginIsolated = true } = options

  return {
    name: 'vite-plugin-utils',

    config: () => {
      return buildTime
        ? {
            define: {
              __BUILD_TIME__: `'${new Date().toLocaleString()}'`,
            },
          }
        : {}
    },

    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        if (crossOriginIsolated) {
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        }
        next()
      })
    },

    configurePreviewServer: (server) => {
      server.middlewares.use((req, res, next) => {
        if (crossOriginIsolated) {
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        }
        next()
      })
    },
  }
}

export default Utils
