import { getCurrentInstance, onBeforeMount } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tryOnBeforeMount = (fn: (...args: any[]) => any): void => {
  if (getCurrentInstance() !== null) {
    onBeforeMount(fn)
  } else {
    fn()
  }
}

export default tryOnBeforeMount
