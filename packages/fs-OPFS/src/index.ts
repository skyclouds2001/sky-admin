/**
 * package name
 */
export const NAME = 'fs-OPFS'

/**
 * package version
 */
export const VERSION = '0.0.0'

export { isSupported } from './init'

export { getFileHandle, getDirHandle } from './handle'

export { readFile, readFileAsText, readFileAsBuffer, readFileAsStream, readDir } from './read'

export { writeFile } from './write'
