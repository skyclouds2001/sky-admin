const useVibrate = (
  pattern: VibratePattern
): {
  isSupported: boolean
  vibrate: () => void
  stop: () => void
} => {
  const isSupported = 'vibrate' in navigator

  const vibrate = (): void => {
    if (!isSupported) return

    navigator.vibrate(pattern)
  }

  const stop = (): void => {
    if (!isSupported) return

    navigator.vibrate(0)
  }

  return {
    isSupported,
    vibrate,
    stop,
  }
}

export default useVibrate
