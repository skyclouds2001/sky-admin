import { root } from './init'
import { resolvePath, type Path } from './util'

interface GetHandleOptions {
  create?: boolean
}

/**
 * get file handle in the given path
 * @param path given path
 * @param options read additional options
 * @returns the file handle
 */
export const getFileHandle = async (path: Path, options: GetHandleOptions = {}): Promise<FileSystemFileHandle> => {
  const { create = false } = options
  const paths = resolvePath(path)
  const len = paths.length

  let dirHandle = root
  for (let i = 0; i < len - 1; ++i) {
    dirHandle = await dirHandle.getDirectoryHandle(paths[i], {
      create,
    })
  }
  const fileHandle = await dirHandle.getFileHandle(paths[len - 1], {
    create,
  })

  return fileHandle
}

/**
 * get dictionary handle in the given path
 * @param path given path
 * @param options read additional options
 * @returns the dictionary handle
 */
export const getDirHandle = async (path: Path, options: GetHandleOptions = {}): Promise<FileSystemDirectoryHandle> => {
  const { create = false } = options
  const paths = resolvePath(path)
  const len = paths.length

  let dirHandle = root
  for (let i = 0; i < len; ++i) {
    dirHandle = await dirHandle.getDirectoryHandle(paths[i], {
      create,
    })
  }

  return dirHandle
}
