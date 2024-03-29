/**
 * package name
 */
export const NAME = 'fs-OPFS'

/**
 * package version
 */
export const VERSION = '0.0.0'

export { copyDir, copyFile } from './copy'

export { makeDir } from './make'

export { openDir, openFile } from './open'

export { readDir, readFile, readFileAsBuffer, readFileAsStream, readFileAsText } from './read'

export { removeDir, removeFile } from './remove'

export { renameDir, renameFile } from './rename'

export { isSupported } from './util'

export { writeFile } from './write'
