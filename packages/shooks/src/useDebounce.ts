import { type Ref, unref } from 'vue'
import { type Fn } from '.'

const useDebounce = <F extends Fn>(fn: F, timeout: number | Ref<number>): ((...args: Parameters<F>) => void) => {
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
