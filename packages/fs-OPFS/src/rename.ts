import { copyDir, copyFile } from './copy'
import { removeDir, removeFile } from './remove'

/**
 * rename file
 * @param oldPath previous file name
 * @param newPath new file name
 */
export const renameFile = async (oldPath: string, newPath: string): Promise<void> => {
  await copyFile(oldPath, newPath)
  await removeFile(oldPath)
}

/**
 * rename directory
 * @param oldPath previous directory name
 * @param newPath new directory name
 */
export const renameDir = async (oldPath: string, newPath: string): Promise<void> => {
  await copyDir(oldPath, newPath)
  await removeDir(oldPath)
}
