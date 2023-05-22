import { computed, type ComputedRef, ref } from 'vue'

interface EyeDropper {
  // eslint-disable-next-line @typescript-eslint/no-misused-new
  new (): EyeDropper
  open: (options?: EyeDropperOpenOptions) => Promise<{ sRGBHex: string }>
  [Symbol.toStringTag]: 'EyeDropper'
}

interface EyeDropperOpenOptions {
  signal: AbortSignal
}

type WindowWithEyeDropper = typeof window & {
  EyeDropper: EyeDropper
}

const useEyeDropper = (
  options: {
    initial?: string | null
  } = {}
): {
  isSupported: boolean
  color: ComputedRef<string | null>
  open: (options?: EyeDropperOpenOptions) => void
} => {
  const { initial = null } = options

  const isSupported = 'EyeDropper' in window

  const color = ref<string | null>(initial)

  const open = (options?: EyeDropperOpenOptions): void => {
    if (!isSupported) return

    void new (window as WindowWithEyeDropper).EyeDropper().open(options).then(({ sRGBHex }) => {
      color.value = sRGBHex
    })
  }

  return {
    isSupported,
    color: computed(() => color.value),
    open,
  }
}

export default useEyeDropper
