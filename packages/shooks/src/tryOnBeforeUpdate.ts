import { getCurrentInstance, onBeforeUpdate } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tryOnBeforeUpdate = (fn: (...args: any[]) => any): void => {
  if (getCurrentInstance() !== null) {
    onBeforeUpdate(fn)
  }
}

export default tryOnBeforeUpdate
