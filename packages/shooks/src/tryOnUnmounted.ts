import { getCurrentInstance, onUnmounted } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tryOnUnmounted = (fn: (...args: any[]) => any): void => {
  if (getCurrentInstance() !== null) {
    onUnmounted(fn)
  }
}

export default tryOnUnmounted
