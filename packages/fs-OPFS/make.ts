import { openDir } from './open'
import { type Path } from './util'

/**
 * create directory
 * @param path given path
 */
export const makeDir = async (path: Path): Promise<void> => {
  await openDir(path)
}
