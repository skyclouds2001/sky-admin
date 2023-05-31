import { computed, type ComputedRef, shallowRef, type ShallowRef } from 'vue'
import { useEventListener } from '@/hook'

const useDevicesList = (): {
  isSupported: boolean
  devices: ShallowRef<MediaDeviceInfo[]>
  videoInputs: ComputedRef<MediaDeviceInfo[]>
  audioInputs: ComputedRef<MediaDeviceInfo[]>
  audioOutputs: ComputedRef<MediaDeviceInfo[]>
} => {
  const isSupported = 'mediaDevices' in navigator && 'enumerateDevices' in navigator.mediaDevices

  const devices = shallowRef<MediaDeviceInfo[]>([])

  const videoInputs = computed(() => devices.value?.filter((device) => device.kind === 'videoinput'))
  const audioInputs = computed(() => devices.value?.filter((device) => device.kind === 'audioinput'))
  const audioOutputs = computed(() => devices.value?.filter((device) => device.kind === 'audiooutput'))

  const update = async (): Promise<void> => {
    devices.value = await navigator.mediaDevices.enumerateDevices()
  }

  if (isSupported) {
    useEventListener<MediaDevices, MediaDevicesEventMap, 'devicechange'>(navigator.mediaDevices, 'devicechange', () => {
      void update()
    })
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
