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

  const update = (): void => {
    void navigator.permissions.query({ name }).then((res) => {
      permission.value = res.state
    })
  }

  void navigator.permissions.query({ name }).then((permissionStatus) => {
    permission.value = permissionStatus.state

    useEventListener<PermissionStatus, PermissionStatusEventMap, 'change'>(permissionStatus, 'change', () => {
      update()
    })
  })

  return {
    isSupported,
    status: computed(() => permission.value),
  }
}

export default usePermission
