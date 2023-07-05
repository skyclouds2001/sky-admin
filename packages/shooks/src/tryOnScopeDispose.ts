import { getCurrentScope, onScopeDispose } from 'vue'
import { type Fn } from '.'

const tryOnScopeDispose = (fn: Fn): void => {
  if (getCurrentScope() !== undefined) {
    onScopeDispose(fn)
  }
}

export default tryOnScopeDispose
