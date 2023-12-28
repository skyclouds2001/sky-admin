import { getSubDir, resolvePath, type Path } from './util'

/**
 * remove file
 * @param path given path
 */
export const removeFile = async (path: Path): Promise<void> => {
  const handle = await getSubDir(path)

  const filename = resolvePath(path).at(-1) as string

  await handle.removeEntry(filename)
}

/**
 * remove directory
 * @param path given path
 */
export const removeDir = async (path: Path): Promise<void> => {
  const handle = await getSubDir(path)

  const filename = resolvePath(path).at(-1) as string

  await handle.removeEntry(filename)
}
