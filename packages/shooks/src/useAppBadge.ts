import { ref, type Ref, watch } from 'vue'

const useAppBadge = (
  options: {
    initial?: number
  } = {}
): {
  isSupported: boolean
  contents: Ref<number>
  update: (count: number) => void
  clear: () => void
} => {
  const { initial = 0 } = options
  const isSupported = 'clearAppBadge' in navigator && 'setAppBadge' in navigator

  const contents = ref(initial)

  const update = (count: number): void => {
    contents.value = count
  }

  const clear = (): void => {
    contents.value = 0
  }

  watch(
    contents,
    (contents) => {
      if (contents !== 0) {
        void (navigator as NavigatorWithAppBadge).setAppBadge(contents)
      } else {
        void (navigator as NavigatorWithAppBadge).clearAppBadge()
      }
    },
    {
      immediate: true,
    }
  )

  return {
    isSupported,
    contents,
    update,
    clear,
  }
}

export default useAppBadge

type NavigatorWithAppBadge = Navigator & {
  clearAppBadge: () => Promise<void>
  setAppBadge: (contents?: number) => Promise<void>
}
