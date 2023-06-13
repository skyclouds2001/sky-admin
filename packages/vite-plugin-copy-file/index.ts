import { createLogger, normalizePath, type Plugin, type ResolvedConfig } from 'vite'
import path from 'node:path'
import fs from 'node:fs'

const CopyFile = (
  options: {
    files?: Array<{
      source: string
      target: string
    }>
  } = {}
): Plugin => {
  const { files = [] } = options

  const logger = createLogger()

  let config: ResolvedConfig

  return {
    name: 'vite-plugin-copy-file',
    apply: 'build',
    configResolved: (cf) => {
      config = cf
    },
    closeBundle: () => {
      const {
        root,
        build: { outDir: out },
      } = config

      files.forEach((file) => {
        // 判断传入参数 - 目标文件和原文件的名称/路径是否合法
        if (typeof file.source !== 'string') {
          logger.error('[ERROR]: source file should be a string!')
          return
        }
        if (typeof file.target !== 'string') {
          logger.error('[ERROR]: target file should be a string!')
          return
        }

        let source: string
        try {
          source = path.resolve(normalizePath(root), normalizePath(file.source))
        } catch {
          logger.error('[ERROR]: normalize source file path fail!')
          return
        }
        let target: string
        try {
          target = path.resolve(normalizePath(root), normalizePath(out), normalizePath(file.target))
        } catch {
          logger.error('[ERROR]: normalize target file path fail!')
          return
        }

        try {
          fs.accessSync(source, fs.constants.R_OK)
        } catch {
          logger.error("[ERROR]: can't read source file!")
          return
        }
        try {
          fs.accessSync(target, fs.constants.W_OK)
        } catch {
          logger.error("[ERROR]: can't write target file!")
          return
        }

        try {
          fs.copyFileSync(source, target)
        } catch {
          logger.error(`[ERROR]: copy file from ${source} to ${target} fail!`)
          return
        }

        logger.info(`[INFO]: copy file from ${source} to ${target} success!`)
      })
    },
  }
}

export default CopyFile
