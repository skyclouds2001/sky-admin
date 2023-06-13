import { getCurrentInstance, onMounted } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tryOnMounted = (fn: (...args: any[]) => any): void => {
  if (getCurrentInstance() !== null) {
    onMounted(fn)
  } else {
    fn()
  }
}

export default tryOnMounted
