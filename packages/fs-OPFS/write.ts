import { openFile } from './open'
import { type Path } from './util'

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
export const writeFile = async (path: Path, data: WriteFileData, options: WriteFileOptions = {}): Promise<void> => {
  const { create = false, position, useExisted = false } = options

  const handle = await openFile(path, {
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
