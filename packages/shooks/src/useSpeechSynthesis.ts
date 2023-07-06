import { type MaybeRefOrGetter, ref, shallowRef, watch } from 'vue'
import { tryOnScopeDispose } from '.'

const useSpeechSynthesis = (
  text: MaybeRefOrGetter<string>,
  options: {
    lang?: SpeechSynthesisUtterance['lang']
    pitch?: SpeechSynthesisUtterance['pitch']
    rate?: SpeechSynthesisUtterance['rate']
    volumn?: SpeechSynthesisUtterance['volume']
    voice?: SpeechSynthesisUtterance['voice']
  } = {}
) => {
  const { lang = 'en-US', pitch = 1, rate = 1, volumn = 1, voice = null } = options

  const isSupported = 'speechSynthesis' in window

  const isPlaying = ref(false)

  const status = ref<'init' | 'play' | 'pause' | 'end'>('init')

  const error = shallowRef<SpeechSynthesisErrorEvent | null>(null)

  const toggle = (value?: boolean) => {
    isPlaying.value = value ?? !isPlaying.value
  }

  const speak = () => {
    window.speechSynthesis.cancel()
    if (utterance.value !== null) window.speechSynthesis.speak(utterance.value)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    isPlaying.value = false
  }

  const utterance = shallowRef<SpeechSynthesisUtterance | null>(null)

  const update = () => {
    isPlaying.value = false
    status.value = 'init'

    const ssu = new window.SpeechSynthesisUtterance(text)

    ssu.lang = lang
    ssu.voice = voice
    ssu.pitch = pitch
    ssu.rate = rate
    ssu.volume = volumn

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
      error.value = e
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
    status,
    error,
    toggle,
    speak,
    stop,
    utterance,
  }
}

export default useSpeechSynthesis
