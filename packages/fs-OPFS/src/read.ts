import { openDir, openFile } from './open'
import { type Path } from './util'

interface ReadFileOptions {
  create?: boolean
}

/**
 * read file contents in the given path
 * @param path given path
 * @param options read additional options
 * @returns the content of file as a `File` object
 */
export const readFile = async (path: Path, options: ReadFileOptions = {}): Promise<File> => {
  const { create = false } = options

  const handle = await openFile(path, {
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
export const readFileAsText = async (path: Path, options: ReadFileOptions = {}): Promise<string> => {
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
export const readFileAsBuffer = async (path: Path, options: ReadFileOptions = {}): Promise<ArrayBuffer> => {
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
export const readFileAsStream = async (path: Path, options: ReadFileOptions = {}): Promise<ReadableStream<Uint8Array>> => {
  const file = await readFile(path, options)

  const stream = file.stream()

  return stream
}

interface ReadDirOptions {
  create?: boolean
}

/**
 * read directory contents in the given path
 * @param path given path
 * @param options read additional options
 * @returns the name of files or dictionaries as an array of string
 */
export const readDir = async (path: Path, options: ReadDirOptions = {}): Promise<string[]> => {
  const { create = false } = options

  const handle = await openDir(path, {
    create,
  })

  const keys: string[] = []

  // @ts-expect-error File System API
  for await (const key of handle.keys()) {
    keys.push(key)
  }

  return keys
}
