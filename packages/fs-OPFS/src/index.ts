/**
 * package name
 */
export const NAME = 'fs-OPFS'

/**
 * package version
 */
export const VERSION = '0.0.0'

export { isSupported } from './init'

export { openDir, openFile } from './open'

export { readDir, readFile, readFileAsBuffer, readFileAsStream, readFileAsText } from './read'

export { removeDir, removeFile } from './remove'

export { writeFile } from './write'
