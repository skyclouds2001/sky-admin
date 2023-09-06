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
   * asset source position, should be an relative path to root dictionary or an absolute path
   */
  source: string
}

/**
 * plugin options
 */
interface CopyAssetOptions {
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
      let {
        root,
        build: { outDir },
      } = config

      if (!Array.isArray(assets)) {
        assets = [assets]
      }

      root = normalizePath(root)
      outDir = normalizePath(outDir)

      const mode = overwrite ? fs.constants.COPYFILE_FICLONE : fs.constants.COPYFILE_EXCL

      assets.forEach((asset) => {
        const src = normalizePath(asset.source)

        const origin = path.resolve(root, src)
        const target = path.resolve(outDir, path.basename(src))

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
