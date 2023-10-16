/**
 * package support status
 */
export const isSupported = 'storage' in window.navigator && 'getDirectory' in window.navigator.storage

/**
 * Origin Private File System (OPFS) root
 */
export const root = await window.navigator.storage.getDirectory()

/**
 * available path type
 */
export type Path = string | URL

/**
 * resolve path to resolved paths array
 * @param path file or directory path
 * @returns resolved paths array
 */
export const resolvePath = (path: Path): string[] => {
  if (path instanceof URL) {
    path = path.pathname
  }

  if (!path.startsWith('/') || path.endsWith('/')) {
    throw new TypeError('Invalid path format!')
  }

  const paths = path.split('/')

  if (paths.length === 0 || paths[0] !== '') {
    throw new TypeError('Invalid path format!')
  }

  return paths
}

interface GetSubDirOptions {
  create?: boolean
}

/**
 * @param path file or directory path
 * @param options get additional options
 * @returns the handle of sub directory
 */
export const getSubDir = async (path: Path, options: GetSubDirOptions = {}): Promise<FileSystemDirectoryHandle> => {
  const { create = false } = options
  const paths = resolvePath(path)
  const len = paths.length

  let dirHandle = root
  for (let i = 1; i < len - 1; ++i) {
    dirHandle = await dirHandle.getDirectoryHandle(paths[i], {
      create,
    })
  }

  return dirHandle
}
