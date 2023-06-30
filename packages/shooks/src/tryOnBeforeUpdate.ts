import { getCurrentInstance, onBeforeUpdate } from 'vue'
import { type Fn } from '.'

const tryOnBeforeUpdate = (fn: Fn): void => {
  if (getCurrentInstance() !== null) {
    onBeforeUpdate(fn)
  }
}

export default tryOnBeforeUpdate
