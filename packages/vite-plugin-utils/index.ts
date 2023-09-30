import type { Plugin } from 'vite'

/**
 * plugin options
 */
interface UtilsOptions {
  // vite hooks

  /**
   * @see https://vitejs.dev/guide/api-plugin.html#config
   */
  config: Plugin['config']

  /**
   * @see https://vitejs.dev/guide/api-plugin.html#configresolved
   */
  configResolved: Plugin['configResolved']

  /**
   * @see https://vitejs.dev/guide/api-plugin.html#configureserver
   */
  configureServer: Plugin['configureServer']

  /**
   * @see https://vitejs.dev/guide/api-plugin.html#configurepreviewserver
   */
  configurePreviewServer: Plugin['configurePreviewServer']

  /**
   * @see https://vitejs.dev/guide/api-plugin.html#transformindexhtml
   */
  transformIndexHtml: Plugin['transformIndexHtml']

  /**
   * @see https://vitejs.dev/guide/api-plugin.html#handlehotupdate
   */
  handleHotUpdate: Plugin['handleHotUpdate']

  /**
   * @see https://rollupjs.org/plugin-development/#options
   */
  options: Plugin['options']

  /**
   * @see https://rollupjs.org/plugin-development/#buildstart
   */
  buildStart: Plugin['buildStart']

  /**
   * @see https://rollupjs.org/plugin-development/#resolveid
   */
  resolveId: Plugin['resolveId']

  /**
   * @see https://rollupjs.org/plugin-development/#load
   */
  load: Plugin['load']

  /**
   * @see https://rollupjs.org/plugin-development/#transform
   */
  transform: Plugin['transform']

  /**
   * @see https://rollupjs.org/plugin-development/#buildend
   */
  buildEnd: Plugin['buildEnd']

  /**
   * @see https://rollupjs.org/plugin-development/#closebundle
   */
  closeBundle: Plugin['closeBundle']
}

/**
 * a plugin for expose hooks for develop
 * @param options plugin options
 * @returns plugin instance
 */
const Utils = (options: Partial<UtilsOptions> = {}): Plugin => {
  return {
    name: 'vite-plugin-utils',
    ...options,
  }
}

export default Utils
