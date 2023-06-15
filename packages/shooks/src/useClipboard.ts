import { readonly, ref, type Ref } from 'vue'
import { useEventListener, useTimeout } from '.'

const useClipboard = (
  options: {
    delay?: number
    listen?: boolean
  } = {}
): {
  isSupported: boolean
  text: Readonly<Ref<string>>
  isCopied: Readonly<Ref<boolean>>
  copy: (data: string) => Promise<void>
} => {
  const { delay = 2500, listen = true } = options

  const isSupported = 'clipboard' in navigator

  const text = ref('')

  const isCopied = ref(false)

  const fn = useTimeout(() => {
    isCopied.value = false
  }, delay)

  const copy = async (data: string): Promise<void> => {
    if (!isSupported) return

    fn.stop()
    isCopied.value = false

    await navigator.clipboard.writeText(data)

    text.value = data
    isCopied.value = true
    fn.start()
  }

  if (isSupported && listen) {
    useEventListener(window, 'copy', () => {
      void navigator.clipboard.readText().then((data) => {
        text.value = data
      })
    })
    useEventListener(window, 'cut', () => {
      void navigator.clipboard.readText().then((data) => {
        text.value = data
      })
    })
  }

  return {
    isSupported,
    text: readonly(text),
    isCopied: readonly(isCopied),
    copy,
  }
}

export default useClipboard
