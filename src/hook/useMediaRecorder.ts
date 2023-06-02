import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '@/hook'

const useMediaRecorder = (): {
  isSupported: boolean
  state: ComputedRef<RecordingState>
  start: (stream: MediaStream, options?: MediaRecorderOptions) => void
  pause: () => void
  resume: () => void
  stop: () => void
} => {
  const isSupported = 'MediaRecorder' in window

  const state = ref<RecordingState>('inactive')

  let mediaRecorder: MediaRecorder | null = null

  const start = (stream: MediaStream, options?: MediaRecorderOptions): void => {
    if (!isSupported) return

    if (mediaRecorder !== null) return

    mediaRecorder = new MediaRecorder(stream, options)

    mediaRecorder.start()

    state.value = mediaRecorder.state

    useEventListener<MediaRecorder, MediaRecorderEventMap, 'dataavailable'>(mediaRecorder, 'dataavailable', (e) => {
      const blob = new Blob([e.data], { type: 'video/mp4' })
      const link = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = link
      a.download = '录制'
      a.target = '_blank'
      a.hidden = true
      a.style.display = 'none'
      a.click()
    })
  }

  const pause = (): void => {
    if (!isSupported) return

    if (mediaRecorder === null) return

    if (mediaRecorder.state !== 'recording') return

    mediaRecorder.pause()

    state.value = mediaRecorder.state
  }

  const resume = (): void => {
    if (!isSupported) return

    if (mediaRecorder === null) return

    if (mediaRecorder.state !== 'paused') return

    mediaRecorder.resume()

    state.value = mediaRecorder.state
  }

  const stop = (): void => {
    if (!isSupported) return

    if (mediaRecorder === null) return

    mediaRecorder.stop()

    state.value = mediaRecorder.state

    mediaRecorder = null
  }

  return {
    isSupported,
    state: computed(() => state.value),
    start,
    pause,
    resume,
    stop,
  }
}

export default useMediaRecorder
