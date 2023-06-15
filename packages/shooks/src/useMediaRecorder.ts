import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

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
  state: Readonly<Ref<RecordingState>>
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

    if (onDataAvailable !== undefined) {
      useEventListener<MediaRecorder, MediaRecorderEventMap, 'dataavailable'>(mediaRecorder, 'dataavailable', onDataAvailable)
    }

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
    state: readonly(state),
    start,
    pause,
    resume,
    stop,
  }
}

export default useMediaRecorder
