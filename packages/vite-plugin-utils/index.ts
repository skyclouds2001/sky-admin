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
}

/**
 * a plugin for maintain fantastic utils
 * @param options plugin options
 * @returns plugin instance
 */
const Utils = (options: UtilsOptions = {}): Plugin => {
  const { buildTime = true } = options

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
    enforce: 'pre',
  }
}

export default Utils
