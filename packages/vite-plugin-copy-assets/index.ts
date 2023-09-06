import { createLogger, normalizePath, type Plugin, type ResolvedConfig } from 'vite'
import path from 'node:path'
import fs from 'node:fs'

const logger = createLogger()

type MaybeArray<T> = T | T[]

/**
 * asset properties
 */
interface Asset {
  /**
   * asset source file path, must be an relative path to root dictionary or an absolute path
   */
  source: string
  /**
   * asset target file path, must be an relative path to output dictionary, also must provide target file name
   */
  target?: string
}

/**
 * plugin options
 */
interface CopyAssetOptions {
  /**
   * custom root dictionary path for source file, will overwrite the default value, default is `config.root` in vite config
   * @default config.root
   */
  root?: string
  /**
   * custom root dictionary path for built output, will overwrite the default value, default is `config.build.outDirconfig.build.outDir` in vite config
   * @default config.build.outDir
   */
  out?: string
  /**
   * whether continue copy file if target file has existed
   * @default true
   */
  overwrite?: boolean
}

/**
 * A plugin for copy asset to build results
 * @param assets assets list
 * @param options plugin options
 * @returns plugin instance
 */
const CopyAssets = (assets: MaybeArray<Asset>, options: CopyAssetOptions = {}): Plugin => {
  const { overwrite = true } = options

  let config: ResolvedConfig

  return {
    name: 'vite-plugin-copy-assets',
    apply: 'build',
    configResolved: (cf) => {
      config = cf
    },
    closeBundle: () => {
      if (!Array.isArray(assets)) {
        assets = [assets]
      }

      const root = normalizePath(options.root ?? config.root)
      const outDir = normalizePath(options.out ?? config.build.outDir)

      const mode = overwrite ? fs.constants.COPYFILE_FICLONE : fs.constants.COPYFILE_EXCL

      assets.forEach((asset) => {
        const src = normalizePath(asset.source)

        const origin = path.resolve(root, src)
        const target = path.resolve(outDir, asset.target != null && !path.isAbsolute(asset.target) ? normalizePath(asset.target) : path.basename(src))

        fs.copyFile(origin, target, mode, (err) => {
          if (err != null) {
            logger.error(`[ERROR]: copy file from ${origin} to ${target} fail!`)
          } else {
            logger.info(`[INFO]: copy file from ${origin} to ${target} success!`)
          }
        })
      })
    },
  }
}

export default CopyAssets
