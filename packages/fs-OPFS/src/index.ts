export const NAME = 'fs-OPFS'

export const VERSION = '0.0.0'

export const isSupported = 'storage' in window.navigator && 'getDirectory' in window.navigator.storage

const root = await window.navigator.storage.getDirectory()

const resolvePath = (path: string): string[] => {
  if (!path.startsWith('/') || path.endsWith('/')) {
    throw new Error('Invalid path')
  }

  const paths = path.split('/')

  return paths
}

const getFileHandle = async (path: string, options: { create?: boolean } = {}): Promise<FileSystemFileHandle> => {
  const { create = true } = options
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

export const readFile = async (path: string): Promise<File> => {
  const handle = await getFileHandle(path)

  const file = await handle.getFile()

  return file
}
