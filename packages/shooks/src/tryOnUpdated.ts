import { getCurrentInstance, onUpdated } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tryOnUpdated = (fn: (...args: any[]) => any): void => {
  if (getCurrentInstance() !== null) {
    onUpdated(fn)
  }
}

export default tryOnUpdated
