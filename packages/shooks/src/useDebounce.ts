import { type Ref, unref } from 'vue'

const useDebounce = <F extends (...args: any[]) => any>(fn: F, timeout: number | Ref<number>): ((...args: Parameters<F>) => void) => {
  let timer: number | null = null
  return (...args) => {
    if (timer !== null) {
      window.clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fn(...args)
      timer = null
    }, unref(timeout))
  }
}

export default useDebounce
