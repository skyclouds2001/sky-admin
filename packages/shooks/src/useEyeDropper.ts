import { readonly, ref, type Ref } from 'vue'

type WindowWithEyeDropper = typeof window & {
  EyeDropper: EyeDropper
}

interface EyeDropper {
  // eslint-disable-next-line @typescript-eslint/no-misused-new
  new (): EyeDropper
  open: (options?: EyeDropperOpenOptions) => Promise<{ sRGBHex: string }>
}

interface EyeDropperOpenOptions {
  signal: AbortSignal
}

const useEyeDropper = (
  options: {
    initial?: string | null
  } = {}
): {
  isSupported: boolean
  color: Readonly<Ref<string | null>>
  open: (options?: EyeDropperOpenOptions) => Promise<void>
} => {
  const { initial = null } = options

  const isSupported = 'EyeDropper' in window

  const color = ref<string | null>(initial)

  const open = async (options?: EyeDropperOpenOptions): Promise<void> => {
    if (!isSupported) return

    const { sRGBHex } = await new (window as WindowWithEyeDropper).EyeDropper().open(options)
    color.value = sRGBHex
  }

  return {
    isSupported,
    color: readonly(color),
    open,
  }
}

export default useEyeDropper
