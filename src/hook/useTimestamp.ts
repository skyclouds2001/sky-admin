import { getCurrentScope, onScopeDispose, ref, type Ref } from 'vue'

const useTimestamp = (
  options: {
    offset?: number
  } = {}
): {
  timestamp: Ref<number>
} => {
  const { offset = 0 } = options

  const timestamp = ref(Date.now() + offset)

  const id = window.requestAnimationFrame(() => {
    timestamp.value = Date.now() + offset
  })

  if (getCurrentScope() !== undefined) {
    onScopeDispose(() => {
      window.cancelAnimationFrame(id)
    })
  }

  return {
    timestamp,
  }
}

export default useTimestamp
