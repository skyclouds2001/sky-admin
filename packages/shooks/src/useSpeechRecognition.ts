import { shallowRef, ref, watch } from 'vue'
import { tryOnScopeDispose } from '.'

const useSpeechRecognition = (options: {
    lang?: string
    continuous?: boolean
    interimResults?: boolean
} = {}) => {
    const { lang = 'en-US', continuous = false, interimResults = false } = options

    const isSupported = 'SpeechRecognition' in window

    const recognition = new window.SpeechRecognition()

    const isListening = ref(false)
    const isFinished = ref(false)

    const result = shallowRef('')
    const error = shallowRef<SpeechRecognitionErrorEvent | null>(null)

    const start = () => {
        isListening.value = true
    }

    const stop = () => {
        isListening.value = false
    }

    const toggle = () => {
        isListening.value = !isListening.value
    }

    if (isSupported) {
        recognition.continuous = continuous
        recognition.interimResults = interimResults
        recognition.lang = lang

        recognition.addEventListener('start', () => {
            isListening.value = true
            isFinished.value = false
        })

        recognition.addEventListener('result', (e) => {
            result.value = Array.from(e.results).map((res) => {
                isFinished.value = res.isFinal
                return result[0]
            }).map((res) => res.transcript).join('')
            error.value = null
        })

        recognition.addEventListener('error', (e) => {
            error.value = e
        })

        recognition.addEventListener('end', () => {
            isListening.value = false
        })

        watch(isListening, (isListening) => {
            if (isListening) {
                recognition.start()
            } else {
                recognition.stop()
            }
        })
    }

    tryOnScopeDispose(() => {
        isListening.value = false
    })

    return {
        isSupported,
        isListening,
        isFinished,
        result,
        error,
        start,
        stop,
        toggle,
    }
}

export default useSpeechRecognition
