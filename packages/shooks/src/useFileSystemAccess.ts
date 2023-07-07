import { computed, type ComputedRef, ref, type Ref, watch } from 'vue'

const useFileSystemAccess = (
  options: { dataType?: 'Text' | 'ArrayBuffer' | 'Blob' } = {}
): {
  isSupported: boolean
  data: Ref<string | ArrayBuffer | Blob | undefined>
  file: Ref<File | undefined>
  fileName: ComputedRef<string | undefined>
  fileMIME: ComputedRef<string | undefined>
  fileSize: ComputedRef<number | undefined>
  fileLastModified: ComputedRef<number | undefined>
  open: (options?: ShowOpenFilePickerOptions) => Promise<void>
  create: (options?: ShowSaveFilePickerOptions) => Promise<void>
  save: (options?: ShowSaveFilePickerOptions) => Promise<void>
} => {
  const { dataType = 'Text' } = options

  const isSupported = 'showOpenFilePicker' in window && 'showSaveFilePicker' in window && 'showDirectoryPicker' in window

  let fileHandle: FileSystemFileHandle

  const data = ref<string | ArrayBuffer | Blob>()

  const file = ref<File>()

  const fileName = computed(() => file.value?.name)
  const fileMIME = computed(() => file.value?.type)
  const fileSize = computed(() => file.value?.size)
  const fileLastModified = computed(() => file.value?.lastModified)

  const updateFile = async (): Promise<void> => {
    file.value = await fileHandle?.getFile()
  }

  const updateData = async (): Promise<void> => {
    switch (dataType) {
      case 'Text':
        data.value = await file.value?.text()
        break
      case 'ArrayBuffer':
        data.value = await file.value?.arrayBuffer()
        break
      case 'Blob':
        data.value = file.value
        break
    }
  }

  const open = async (options?: ShowOpenFilePickerOptions): Promise<void> => {
    if (!isSupported) return

    const [handle] = await window.showOpenFilePicker(options)
    fileHandle = handle

    await updateFile()
    await updateData()
  }

  const create = async (options?: ShowSaveFilePickerOptions): Promise<void> => {
    if (!isSupported) return

    fileHandle = await window.showSaveFilePicker(options)

    await updateFile()
    await updateData()
  }

  const save = async (options?: ShowSaveFilePickerOptions): Promise<void> => {
    if (!isSupported) return

    if (fileHandle === undefined) fileHandle = await window.showSaveFilePicker(options)

    if (data.value !== undefined) {
      const stream = await fileHandle.createWritable()
      await stream.write(data.value)
      await stream.close()
    }

    await updateFile()
  }

  watch(() => dataType, updateData)

  return {
    isSupported,
    data,
    file,
    fileName,
    fileMIME,
    fileSize,
    fileLastModified,
    open,
    create,
    save,
  }
}

export default useFileSystemAccess
