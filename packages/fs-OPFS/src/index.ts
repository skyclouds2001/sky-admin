export const NAME = 'fs-OPFS'

export const VERSION = '0.0.0'

export const isSupported = 'storage' in window.navigator && 'getDirectory' in window.navigator.storage

const root = await window.navigator.storage.getDirectory()

const resolvePath = (path: string): string[] => {
  if (!path.startsWith('/') || path.endsWith('/')) {
    throw new TypeError('Invalid path')
  }

  const paths = path.split('/')

  return paths
}

const getFileHandle = async (path: string, options: { create?: boolean } = {}): Promise<FileSystemFileHandle> => {
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

export const readFile = async (path: string, options: { create?: boolean } = {}): Promise<File> => {
  const { create = false } = options

  const handle = await getFileHandle(path, { create })

  const file = await handle.getFile()

  return file
}

export const readFileAsText = async (path: string, options: { create?: boolean } = {}): Promise<string> => {
  const file = await readFile(path, options)

  const text = await file.text()

  return text
}

export const readFileAsBuffer = async (path: string, options: { create?: boolean } = {}): Promise<ArrayBuffer> => {
  const file = await readFile(path, options)

  const buffer = await file.arrayBuffer()

  return buffer
}

export const readFileAsStream = async (path: string, options: { create?: boolean } = {}): Promise<ReadableStream<Uint8Array>> => {
  const file = await readFile(path, options)

  const stream = file.stream()

  return stream
}
