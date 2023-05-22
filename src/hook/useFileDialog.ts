import { readonly, ref, type Ref } from 'vue'

interface Options {
  multiple?: boolean
  accept?: string
  capture?: 'user' | 'environment'
  reset?: boolean
}

const useFileDialog = (
  options: Options = {}
): {
  files: Readonly<Ref<FileList | null>>
  open: (options?: Options) => void
  reset: () => void
} => {
  const files = ref<FileList | null>(null)

  const input = document.createElement('input')
  input.type = 'file'
  input.addEventListener('change', (e) => {
    files.value = (e.target as HTMLInputElement).files
  })

  const open = (localOptions: Options = {}): void => {
    const { multiple = true, accept = '*', reset: shouldReset = false } = { ...options, ...localOptions }

    input.multiple = multiple
    input.accept = accept

    if (localOptions.capture !== undefined) {
      input.capture = localOptions.capture
    }

    if (shouldReset) {
      reset()
    }

    input.click()
  }

  const reset = (): void => {
    files.value = null
    input.value = ''
  }

  return {
    files: readonly(files),
    open,
    reset,
  }
}

export default useFileDialog
