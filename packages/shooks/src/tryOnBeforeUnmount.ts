import { getCurrentInstance, onBeforeUnmount } from 'vue'
import { type Fn } from '.'

const tryOnBeforeUnmount = (fn: Fn): void => {
  if (getCurrentInstance() !== null) {
    onBeforeUnmount(fn)
  }
}

export default tryOnBeforeUnmount
