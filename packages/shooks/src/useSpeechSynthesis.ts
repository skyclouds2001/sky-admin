import { type MaybeRefOrGetter, readonly, ref, type Ref, shallowReadonly, shallowRef, type ShallowRef, toValue, watch } from 'vue'
import { tryOnScopeDispose } from '.'

const useSpeechSynthesis = (
  text: MaybeRefOrGetter<string>,
  options: {
    lang?: SpeechSynthesisUtterance['lang']
    pitch?: SpeechSynthesisUtterance['pitch']
    rate?: SpeechSynthesisUtterance['rate']
    volume?: SpeechSynthesisUtterance['volume']
    voice?: SpeechSynthesisUtterance['voice']
  } = {}
): {
    isSupported: boolean
    isPlaying: Ref<boolean>
    status: Readonly<Ref<'init' | 'play' | 'pause' | 'end'>>
    error: Readonly<Ref<string | null>>
    utterance: Readonly<ShallowRef<SpeechSynthesisUtterance | null>>
    speak: () => void
    pause: () => void
    resume: () => void
    stop: () => void
    toggle: () => void
  } => {
  const { lang = 'en-US', pitch = 1, rate = 1, volume = 1, voice = null } = options

  const isSupported = 'speechSynthesis' in window

  const isPlaying = ref(false)

  const status = ref<'init' | 'play' | 'pause' | 'end'>('init')

  const error = ref<string | null>(null)

  const toggle = (): void => {
    isPlaying.value = !isPlaying.value
  }

  const speak = (): void => {
    if (utterance.value === null || window.speechSynthesis.speaking) return

    window.speechSynthesis.speak(utterance.value)
  }

  const pause = (): void => {
    if (utterance.value === null || window.speechSynthesis.paused) return

    window.speechSynthesis.pause()
  }

  const resume = (): void => {
    if (utterance.value === null || !window.speechSynthesis.paused) return

    window.speechSynthesis.resume()
  }

  const stop = (): void => {
    if (utterance.value === null || !window.speechSynthesis.speaking) return

    window.speechSynthesis.cancel()
  }

  const utterance = shallowRef<SpeechSynthesisUtterance | null>(null)

  const update = (): void => {
    isPlaying.value = false
    status.value = 'init'

    const ssu = new window.SpeechSynthesisUtterance(toValue(text))

    ssu.lang = lang
    ssu.voice = voice
    ssu.pitch = pitch
    ssu.rate = rate
    ssu.volume = volume

    ssu.addEventListener('start', () => {
      isPlaying.value = true
      status.value = 'play'
    })

    ssu.addEventListener('pause', () => {
      isPlaying.value = false
      status.value = 'pause'
    })

    ssu.addEventListener('resume', () => {
      isPlaying.value = true
      status.value = 'play'
    })

    ssu.addEventListener('end', () => {
      isPlaying.value = false
      status.value = 'end'
    })

    ssu.addEventListener('error', (e) => {
      error.value = e.error
    })

    utterance.value = ssu
  }

  if (isSupported) {
    update()

    watch(isPlaying, (isPlaying) => {
      if (isPlaying) {
        window.speechSynthesis.resume()
      } else {
        window.speechSynthesis.pause()
      }
    })
  }

  tryOnScopeDispose(() => {
    isPlaying.value = false
  })

  return {
    isSupported,
    isPlaying,
    status: readonly(status),
    error: readonly(error),
    utterance: shallowReadonly(utterance),
    speak,
    pause,
    resume,
    stop,
    toggle,
  }
}

export default useSpeechSynthesis
