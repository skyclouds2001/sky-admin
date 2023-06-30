import { getCurrentInstance, onBeforeMount } from 'vue'
import { type Fn } from '.'

const tryOnBeforeMount = (fn: Fn): void => {
  if (getCurrentInstance() !== null) {
    onBeforeMount(fn)
  } else {
    fn()
  }
}

export default tryOnBeforeMount
