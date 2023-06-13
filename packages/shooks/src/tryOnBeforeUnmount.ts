import { getCurrentInstance, onBeforeUnmount } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tryOnBeforeUnmount = (fn: (...args: any[]) => any): void => {
  if (getCurrentInstance() !== null) {
    onBeforeUnmount(fn)
  }
}

export default tryOnBeforeUnmount
