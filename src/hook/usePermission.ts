import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '@/hook'

const usePermission = (
  name: PermissionName
): {
  isSupported: boolean
  status: ComputedRef<PermissionState | null>
} => {
  const isSupported = 'permissions' in navigator

  const permission = ref<PermissionState | null>(null)

  let permissionStatus: PermissionStatus

  const update = (): void => {
    permission.value = permissionStatus.state
  }

  if (isSupported) {
    void navigator.permissions.query({ name }).then((status) => {
      permissionStatus = status

      update()

      useEventListener<PermissionStatus, PermissionStatusEventMap, 'change'>(status, 'change', update)
    })
  }

  return {
    isSupported,
    status: computed(() => permission.value),
  }
}

export default usePermission
