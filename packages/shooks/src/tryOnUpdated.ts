import { getCurrentInstance, onUpdated } from 'vue'
import { type Fn } from '.'

const tryOnUpdated = (fn: Fn): void => {
  if (getCurrentInstance() !== null) {
    onUpdated(fn)
  }
}

export default tryOnUpdated
