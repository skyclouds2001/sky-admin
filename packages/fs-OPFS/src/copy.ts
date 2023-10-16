import { openDir, openFile } from './open'
import { type Path } from './util'

/**
 * copy file
 * @param src source file path
 * @param dest destination file path
 */
export const copyFile = async (src: Path | FileSystemFileHandle, dest: Path | FileSystemFileHandle): Promise<void> => {
  const srcHandle =
    src instanceof FileSystemFileHandle
      ? src
      : await openFile(src, {
          create: false,
        })
  const srcFile = await srcHandle.getFile()
  const readBuffer = await srcFile.arrayBuffer()

  const destHandle =
    dest instanceof FileSystemFileHandle
      ? dest
      : await openFile(dest, {
          create: true,
        })
  const writeStream = await destHandle.createWritable()

  await writeStream.write(readBuffer)
  await writeStream.close()
}

/**
 * copy dictionary
 * @param src source file path
 * @param dest destination file path
 */
export const copyDir = async (src: Path | FileSystemDirectoryHandle, dest: Path | FileSystemDirectoryHandle): Promise<void> => {
  const srcHandle =
    src instanceof FileSystemDirectoryHandle
      ? src
      : await openDir(src, {
          create: false,
        })

  const destHandle =
    dest instanceof FileSystemDirectoryHandle
      ? dest
      : await openDir(dest, {
          create: true,
        })

  // @ts-expect-error builtin definition files does not support for async iterator
  for await (const [name, handle] of srcHandle.entries()) {
    if (handle.kind === 'directory') {
      await copyDir(await srcHandle.getDirectoryHandle(name), await destHandle.getDirectoryHandle(name))
    } else {
      await copyFile(await srcHandle.getFileHandle(name), await destHandle.getFileHandle(name))
    }
  }
}
