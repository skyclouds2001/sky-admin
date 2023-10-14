/**
 * package name
 */
export const NAME = 'fs-OPFS'

/**
 * package version
 */
export const VERSION = '0.0.0'

/**
 * package support status
 */
export const isSupported = 'storage' in window.navigator && 'getDirectory' in window.navigator.storage

const root = await window.navigator.storage.getDirectory()

const resolvePath = (path: string): string[] => {
  if (!path.startsWith('/') || path.endsWith('/')) {
    throw new TypeError('Invalid path')
  }

  const paths = path.split('/')

  return paths
}

interface GetHandleOptions {
  create?: boolean
}

/**
 * get file handle in the given path
 * @param path given path
 * @param options read additional options
 * @returns the file handle
 */
export const getFileHandle = async (path: string, options: GetHandleOptions = {}): Promise<FileSystemFileHandle> => {
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
export const getDirHandle = async (path: string, options: GetHandleOptions = {}): Promise<FileSystemDirectoryHandle> => {
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

interface ReadFileOptions {
  create?: boolean
}

/**
 * read file contents in the given path
 * @param path given path
 * @param options read additional options
 * @returns the content of file as a `File` object
 */
export const readFile = async (path: string, options: ReadFileOptions = {}): Promise<File> => {
  const { create = false } = options

  const handle = await getFileHandle(path, {
    create,
  })

  const file = await handle.getFile()

  return file
}

/**
 * read file contents in the given path
 * @param path given path
 * @param options read additional options
 * @returns the content of file as string
 */
export const readFileAsText = async (path: string, options: ReadFileOptions = {}): Promise<string> => {
  const file = await readFile(path, options)

  const text = await file.text()

  return text
}

/**
 * read file contents in the given path
 * @param path given path
 * @param options read additional options
 * @returns the content of file as a `ArrayBuffer` object
 */
export const readFileAsBuffer = async (path: string, options: ReadFileOptions = {}): Promise<ArrayBuffer> => {
  const file = await readFile(path, options)

  const buffer = await file.arrayBuffer()

  return buffer
}

/**
 * read file contents in the given path
 * @param path given path
 * @param options read additional options
 * @returns the content of file as a `ReadableStream` object
 */
export const readFileAsStream = async (path: string, options: ReadFileOptions = {}): Promise<ReadableStream<Uint8Array>> => {
  const file = await readFile(path, options)

  const stream = file.stream()

  return stream
}

interface ReadDirOptions {
  create?: boolean
}

/**
 * read dictionary contents in the given path
 * @param path given path
 * @param options read additional options
 * @returns the name of files or dictionaries as an array of string
 */
export const readDir = async (path: string, options: ReadDirOptions = {}): Promise<string[]> => {
  const { create = false } = options

  const handle = await getDirHandle(path, {
    create,
  })

  const keys: string[] = []

  // @ts-expect-error builtin definition files does not support for async iterator
  for await (const key of handle.keys()) {
    keys.push(key)
  }

  return keys
}

interface WriteFileOptions {
  create?: boolean
  position?: number
  useExisted?: boolean
}

type WriteFileData = string | Blob | ArrayBuffer | ArrayBufferView | DataView

/**
 * write data to the specific file  in the given path
 * @param path given path
 * @param data data to be written to the specific file
 * @param options write additional options
 */
export const writeFile = async (path: string, data: WriteFileData, options: WriteFileOptions = {}): Promise<void> => {
  const { create = false, position, useExisted = false } = options

  const handle = await getFileHandle(path, {
    create,
  })

  const stream = await handle.createWritable({
    keepExistingData: useExisted,
  })

  await stream.write({
    type: 'write',
    data,
    position,
  })

  await stream.close()
}
