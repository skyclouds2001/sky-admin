import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

const usePermission = (
  name: PermissionName | 'accelerometer' | 'accessibility-events' | 'ambient-light-sensor' | 'background-sync' | 'camera' | 'clipboard-read' | 'clipboard-write' | 'gyroscope' | 'magnetometer' | 'microphone' | 'payment-handler' | 'speaker'
): {
  isSupported: boolean
  status: Readonly<Ref<PermissionState | null>>
} => {
  const isSupported = 'permissions' in navigator

  const permission = ref<PermissionState | null>(null)

  let permissionStatus: PermissionStatus

  const update = (): void => {
    permission.value = permissionStatus.state
  }

  if (isSupported) {
    const permission = name as PermissionName
    void navigator.permissions.query({ name: permission }).then((status) => {
      permissionStatus = status

      update()

      useEventListener<PermissionStatus, PermissionStatusEventMap, 'change'>(status, 'change', update)
    })
  }

  return {
    isSupported,
    status: readonly(permission),
  }
}

export default usePermission
