/**
 * package support status
 */
export const isSupported = 'storage' in window.navigator && 'getDirectory' in window.navigator.storage

/**
 * Origin Private File System (OPFS) root
 */
export const root = await window.navigator.storage.getDirectory()
