import { shallowReadonly, type ShallowRef, shallowRef, readonly, ref, type Ref, watch } from 'vue'
import { tryOnScopeDispose } from '.'

const grammar = `
#JSGF V1.0;
grammar colors;
public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;
`.trim()

const useSpeechRecognition = (
  options: {
    lang?: SpeechRecognition['lang']
    continuous?: SpeechRecognition['continuous']
    interimResults?: SpeechRecognition['interimResults']
    maxAlternatives?: SpeechRecognition['maxAlternatives']
  } = {}
): {
  isSupported: boolean
  recognition: Readonly<ShallowRef<SpeechRecognition | null>>
  isListening: Ref<boolean>
  isFinished: Readonly<Ref<boolean>>
  result: Readonly<Ref<string>>
  error: Readonly<ShallowRef<SpeechRecognitionErrorEvent | null>>
  start: () => void
  stop: () => void
  toggle: () => void
} => {
  const { lang = 'en-US', continuous = false, interimResults = false, maxAlternatives = 1 } = options

  const isSupported = 'SpeechRecognition' in window

  const recognition = shallowRef<SpeechRecognition | null>(null)

  const isListening = ref(false)

  const isFinished = ref(false)

  const result = shallowRef('')

  const error = shallowRef<SpeechRecognitionErrorEvent | null>(null)

  const start = (): void => {
    isListening.value = true
  }

  const stop = (): void => {
    isListening.value = false
  }

  const toggle = (): void => {
    isListening.value = !isListening.value
  }

  if (isSupported) {
    const rec = new window.SpeechRecognition()

    const gra = new window.SpeechGrammarList()
    gra.addFromString(grammar, 1)

    rec.continuous = continuous
    rec.grammars = gra
    rec.interimResults = interimResults
    rec.lang = lang
    rec.maxAlternatives = maxAlternatives

    rec.addEventListener('start', () => {
      isListening.value = true
      isFinished.value = false
    })

    rec.addEventListener('result', (e) => {
      result.value = Array.from(e.results)
        .map((res) => {
          isFinished.value ||= res.isFinal
          return res.item(0)
        })
        .map((res) => res.transcript)
        .join('')
      error.value = null
    })

    rec.addEventListener('error', (e) => {
      error.value = e
    })

    rec.addEventListener('end', () => {
      isListening.value = false
    })

    watch(isListening, (isListening) => {
      if (isListening) {
        rec.start()
      } else {
        rec.stop()
      }
    })

    recognition.value = rec
  }

  tryOnScopeDispose(() => {
    isListening.value = false
  })

  return {
    isSupported,
    recognition: shallowReadonly(recognition),
    isListening,
    isFinished: readonly(isFinished),
    result: readonly(result),
    error: shallowReadonly(error),
    start,
    stop,
    toggle,
  }
}

export default useSpeechRecognition
