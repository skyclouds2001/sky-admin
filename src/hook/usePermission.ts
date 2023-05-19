import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '@/hook'

const usePermission = (name: PermissionName): ComputedRef<PermissionState | null> => {
  const permission = ref<PermissionState | null>(null)

  const update = (): void => {
    void navigator.permissions.query({ name }).then((res) => {
      permission.value = res.state
    })
  }

  void navigator.permissions.query({ name }).then((permissionStatus) => {
    permission.value = permissionStatus.state

    useEventListener<PermissionStatus, PermissionStatusEventMap>(permissionStatus, 'change', () => {
      update()
    })
  })

  return computed(() => permission.value)
}

export default usePermission
