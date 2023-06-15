import { readonly, ref, type Ref, shallowReadonly, shallowRef, type ShallowRef, watch } from 'vue'

const useUserMedia = (
  options: {
    audio?: boolean | MediaTrackConstraints
    video?: boolean | MediaTrackConstraints
  } = {}
): {
  isSupported: boolean
  isEnabled: Readonly<Ref<boolean>>
  stream: Readonly<ShallowRef<MediaStream | null>>
  start: () => Promise<void>
  stop: () => Promise<void>
} => {
  const { audio = false, video = true } = options

  const isSupported = 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices

  const stream = shallowRef<MediaStream | null>(null)

  const isEnabled = ref(false)

  const start = async (): Promise<void> => {
    if (!isSupported) return

    if (stream.value !== null) return

    stream.value = await navigator.mediaDevices.getUserMedia({
      audio,
      video,
    })

    isEnabled.value = stream.value !== null
  }

  const stop = async (): Promise<void> => {
    if (!isSupported) return

    if (stream.value === null) return

    stream.value.getTracks().forEach((v) => {
      v.stop()
    })
    stream.value = null

    isEnabled.value = false
  }

  watch(
    isEnabled,
    (isEnabled) => {
      if (isEnabled) {
        void start()
      } else {
        void stop()
      }
    },
    { immediate: true }
  )

  return {
    isSupported,
    isEnabled: readonly(isEnabled),
    stream: shallowReadonly(stream),
    start,
    stop,
  }
}

export default useUserMedia
