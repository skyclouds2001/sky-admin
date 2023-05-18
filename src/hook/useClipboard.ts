import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener, useTimeout } from '@/hook'

const useClipboard = (
  options: {
    delay?: number
    listen?: boolean
  } = {}
): {
  isSupported: boolean
  text: ComputedRef<string>
  isCopied: ComputedRef<boolean>
  copy: (data: string) => void
} => {
  const { delay = 2500, listen = true } = options

  const isSupported = 'clipboard' in navigator

  const text = ref('')

  const isCopied = ref(false)

  const fn = useTimeout(() => {
    isCopied.value = false
  }, delay)

  const copy = (data: string): void => {
    if (!isSupported) return

    fn.stop()
    isCopied.value = false

    void navigator.clipboard.writeText(data).then(() => {
      text.value = data
      isCopied.value = true
      fn.start()
    })
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
    text: computed(() => text.value),
    isCopied: computed(() => isCopied.value),
    copy,
  }
}

export default useClipboard
