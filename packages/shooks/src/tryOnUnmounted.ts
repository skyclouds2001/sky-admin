import { getCurrentInstance, onUnmounted } from 'vue'
import { type Fn } from '.'

const tryOnUnmounted = (fn: Fn): void => {
  if (getCurrentInstance() !== null) {
    onUnmounted(fn)
  }
}

export default tryOnUnmounted
