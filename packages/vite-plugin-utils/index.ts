import type { Plugin, UserConfig } from 'vite'

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

  const config: UserConfig = {}

  if (buildTime) {
    config.define = {
      __BUILD_TIME__: `'${new Date().toLocaleString()}'`,
    }
  }

  if (crossOriginIsolated) {
    config.server = {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      },
    }
    config.preview = {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      },
    }
  }

  return {
    name: 'vite-plugin-utils',

    config: () => ({ ...config }),
  }
}

export default Utils
