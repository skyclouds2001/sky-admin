import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '@/hook'
import { downloadFile } from '@/util'

const useMediaRecorder = (
  options: {
    onDataAvailable?: (e: BlobEvent) => void
    onError?: (e: Event) => void
    onPause?: (e: Event) => void
    onResume?: (e: Event) => void
    onStart?: (e: Event) => void
    onStop?: (e: Event) => void
  } = {}
): {
  isSupported: boolean
  state: ComputedRef<RecordingState>
  start: (stream: MediaStream, options?: MediaRecorderOptions) => void
  pause: () => void
  resume: () => void
  stop: () => void
} => {
  const { onDataAvailable, onError, onPause, onResume, onStart, onStop } = options

  const isSupported = 'MediaRecorder' in window

  const state = ref<RecordingState>('inactive')

  let mediaRecorder: MediaRecorder | null = null

  const start = (stream: MediaStream, options?: MediaRecorderOptions): void => {
    if (!isSupported) return

    if (mediaRecorder !== null) return

    mediaRecorder = new window.MediaRecorder(stream, options)

    mediaRecorder.start()

    state.value = mediaRecorder.state

    useEventListener<MediaRecorder, MediaRecorderEventMap, 'dataavailable'>(mediaRecorder, 'dataavailable', (e) => {
      if (onDataAvailable !== undefined) onDataAvailable(e)

      const blob = new window.Blob([e.data], { type: 'video/mp4' })

      downloadFile(blob, '录制')
    })

    if (onError !== undefined) {
      useEventListener<MediaRecorder, MediaRecorderEventMap, 'error'>(mediaRecorder, 'error', onError)
    }

    if (onPause !== undefined) {
      useEventListener<MediaRecorder, MediaRecorderEventMap, 'pause'>(mediaRecorder, 'pause', onPause)
    }

    if (onResume !== undefined) {
      useEventListener<MediaRecorder, MediaRecorderEventMap, 'resume'>(mediaRecorder, 'resume', onResume)
    }

    if (onStart !== undefined) {
      useEventListener<MediaRecorder, MediaRecorderEventMap, 'start'>(mediaRecorder, 'start', onStart)
    }

    if (onStop !== undefined) {
      useEventListener<MediaRecorder, MediaRecorderEventMap, 'stop'>(mediaRecorder, 'stop', onStop)
    }
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
