import { getCurrentInstance, onMounted } from 'vue'
import { type Fn } from '.'

const tryOnMounted = (fn: Fn): void => {
  if (getCurrentInstance() !== null) {
    onMounted(fn)
  } else {
    fn()
  }
}

export default tryOnMounted
