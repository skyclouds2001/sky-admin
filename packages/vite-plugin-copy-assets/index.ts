import { createLogger, normalizePath, type Plugin } from 'vite'
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
   * whether enable CORS when in dev server
   * @default false
   */
  cors?:
    | boolean
    | {
        origin?: string
        credentials?: boolean
        methods?: string | string[]
        headers?: string | string[]
      }

  /**
   * whether continue copy file if target file has existed
   * @default true
   */
  overwrite?: boolean
}

/**
 * A plugin for copy asset to build results and server asset when dev
 * @param assets assets list
 * @param options plugin options
 * @returns plugin instance
 */
const CopyAssets = (assets: MaybeArray<Asset>, options: CopyAssetOptions = {}): Plugin => {
  const { overwrite = true, cors = false } = options

  const mappers = new Map<string, string>()

  return {
    name: 'vite-plugin-copy-assets',

    configResolved: (config) => {
      const root = normalizePath(options.root ?? config.root)
      const outDir = normalizePath(options.out ?? config.build.outDir)

      if (!Array.isArray(assets)) {
        assets = [assets]
      }

      assets.forEach((asset) => {
        const src = normalizePath(asset.source)

        const origin = path.resolve(root, src)
        const target = path.resolve(outDir, asset.target != null && !path.isAbsolute(asset.target) ? normalizePath(asset.target) : path.basename(src))

        mappers.set(origin, target)
      })
    },

    closeBundle: () => {
      const mode = overwrite ? fs.constants.COPYFILE_FICLONE : fs.constants.COPYFILE_EXCL

      mappers.forEach((target, origin) => {
        fs.copyFile(origin, target, mode, (err) => {
          if (err != null) {
            logger.error(`[ERROR]: copy file from ${origin} to ${target} fail!`)
          } else {
            logger.info(`[INFO]: copy file from ${origin} to ${target} success!`)
          }
        })
      })
    },

    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        if (req.url == null) {
          next()
          return
        }

        const link = mappers.get(req.url)

        if (link == null) {
          next()
          return
        }

        fs.readFile(link, (err, data) => {
          if (err != null) {
            next()
            return
          }

          if (typeof cors === 'object') {
            if (cors.origin != null) {
              res.setHeader('Access-Control-Allow-Origin', cors.origin)
            }
            if (cors.credentials != null && cors.credentials) {
              res.setHeader('Access-Control-Allow-Credentials', 'true')
            }
            if (cors.methods != null) {
              res.setHeader('Access-Control-Allow-Methods', Array.isArray(cors.methods) ? cors.methods.join(',') : cors.methods)
            }
            if (cors.headers != null) {
              res.setHeader('Access-Control-Allow-Headers', Array.isArray(cors.headers) ? cors.headers.join(',') : cors.headers)
            }
          } else if (cors) {
            res.setHeader('Access-Control-Allow-Origin', '*')
          }

          res.writeHead(200)
          res.write(data)
          res.end()
        })
      })
    },
  }
}

export default CopyAssets
