import { createLogger, normalizePath, type Plugin, type ResolvedConfig } from 'vite'
import path from 'node:path'
import fs from 'node:fs'

type MaybeArray<T> = T | T[]

interface Asset {
  source: string
}

interface CopyAssetOptions {}

const CopyAssets = (assets: MaybeArray<Asset>, options: CopyAssetOptions): Plugin => {
  let config: ResolvedConfig

  return {
    name: 'vite-plugin-copy-assets',
    apply: 'build',
    configResolved: (cf) => {
      config = cf
    },
    closeBundle: () => {
      const logger = createLogger()

      const {
        root,
        build: {
          outDir,
        },
      } = config

      if (!Array.isArray(assets)) {
        assets = [assets]
      }

      const source = normalizePath(root)
      const target = normalizePath(outDir)

      assets.forEach((asset) => {
        const { source: src } = asset
 
        try {
          fs.copyFileSync(path.resolve(source, src), path.resolve(target))

          logger.info(`[INFO]: copy file from ${source} to ${target} success!`)
        } catch (error) {
          logger.error(`[ERROR]: copy file from ${source} to ${target} fail!`)
        }
      })
    },
  }
}

export default CopyAssets
