declare var EyeDropper: {
  prototype: EyeDropper
  new(): EyeDropper
}

interface EyeDropper {
  open: (options?: { signal: AbortSignal }) => Promise<{ sRGBHex: string }>
}
