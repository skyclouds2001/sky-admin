import { resolvePath, getSubDir, type Path } from './util'

interface OpenOptions {
  create?: boolean
}

/**
 * get file handle in the given path
 * @param path given path
 * @param options read additional options
 * @returns the file handle
 */
export const openFile = async (path: Path, options: OpenOptions = {}): Promise<FileSystemFileHandle> => {
  const { create = false } = options
  const paths = resolvePath(path)
  const len = paths.length

  const handle = await getSubDir(path, options)

  const fileHandle = await handle.getFileHandle(paths[len - 1], {
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
export const openDir = async (path: Path, options: OpenOptions = {}): Promise<FileSystemDirectoryHandle> => {
  const { create = false } = options
  const paths = resolvePath(path)
  const len = paths.length

  const handle = await getSubDir(path, options)

  const dirHandle = await handle.getDirectoryHandle(paths[len - 1], {
    create,
  })

  return dirHandle
}
