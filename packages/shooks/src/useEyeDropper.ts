import { readonly, ref, type Ref } from 'vue'

const useEyeDropper = (
  options: {
    initial?: string | null
  } = {}
): {
  isSupported: boolean
  color: Readonly<Ref<string | null>>
  open: (options?: { signal: AbortSignal }) => Promise<void>
} => {
  const { initial = null } = options

  const isSupported = 'EyeDropper' in window

  const color = ref<string | null>(initial)

  const open = async (options?: { signal: AbortSignal }): Promise<void> => {
    if (!isSupported) return

    const { sRGBHex } = await new window.EyeDropper().open(options)
    color.value = sRGBHex
  }

  return {
    isSupported,
    color: readonly(color),
    open,
  }
}

export default useEyeDropper

declare global {
  let EyeDropper: {
    prototype: EyeDropper
    new (): EyeDropper
  }

  interface Window {
    EyeDropper: {
      prototype: EyeDropper
      new (): EyeDropper
    }
  }

  interface EyeDropper {
    open: (options?: { signal: AbortSignal }) => Promise<{ sRGBHex: string }>
  }
}
