import { computed, type ComputedRef, shallowRef, type ShallowRef } from 'vue'
import { useEventListener, usePermission } from '@/hook'

const useDevicesList = (
  options: {
    requestImmediate?: boolean
  } = {}
): {
  isSupported: boolean
  devices: ShallowRef<MediaDeviceInfo[]>
  videoInputs: ComputedRef<MediaDeviceInfo[]>
  audioInputs: ComputedRef<MediaDeviceInfo[]>
  audioOutputs: ComputedRef<MediaDeviceInfo[]>
} => {
  const { requestImmediate = false } = options

  const isSupported = 'mediaDevices' in navigator && 'enumerateDevices' in navigator.mediaDevices

  const devices = shallowRef<MediaDeviceInfo[]>([])

  const videoInputs = computed(() => devices.value?.filter((device) => device.kind === 'videoinput'))
  const audioInputs = computed(() => devices.value?.filter((device) => device.kind === 'audioinput'))
  const audioOutputs = computed(() => devices.value?.filter((device) => device.kind === 'audiooutput'))

  const { status } = usePermission('camera')

  const update = async (): Promise<void> => {
    if (!isSupported) return

    if (status.value !== 'granted') {
      await requestPermission()
    }

    devices.value = await navigator.mediaDevices.enumerateDevices()
  }

  const requestPermission = async (): Promise<void> => {
    if (!isSupported) return

    if (status.value === 'granted') return

    await navigator.mediaDevices.getUserMedia({ audio: true, video: true })

    void update()
  }

  if (isSupported) {
    useEventListener<MediaDevices, MediaDevicesEventMap, 'devicechange'>(navigator.mediaDevices, 'devicechange', () => {
      void update()
    })

    if (requestImmediate) {
      void requestPermission()
    }

    void update()
  }

  return {
    isSupported,
    devices,
    videoInputs,
    audioInputs,
    audioOutputs,
  }
}

export default useDevicesList
