import { computed, type ComputedRef, ref, shallowRef, type ShallowRef } from 'vue'
import { tryOnMounted, tryOnUnmounted, useEventListener } from '.'

const useBluetooth = (): {
  isSupported: boolean
  isAvailable: ComputedRef<boolean>
  isConnected: ComputedRef<boolean>
  device: ShallowRef<BluetoothDevice | null>
  server: ShallowRef<BluetoothRemoteGATTServer | null>
  error: ComputedRef<unknown>
  requestDevice: () => Promise<void>
} => {
  const isSupported = 'bluetooth' in navigator

  const isAvailable = ref(false)

  const isConnected = computed(() => server.value?.connected ?? false)

  const device = shallowRef<BluetoothDevice | null>(null)

  const server = shallowRef<BluetoothRemoteGATTServer | null>(null)

  const error = ref<unknown>()

  const requestDevice = async (): Promise<void> => {
    if (!isSupported) return

    if (!isAvailable.value) return

    error.value = null

    try {
      device.value = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      })
    } catch (err) {
      error.value = err
    }
  }

  const updateBluetoothAvailability = async (): Promise<void> => {
    isAvailable.value = await navigator.bluetooth.getAvailability()
  }

  useEventListener<Bluetooth, BluetoothEventMap, 'availabilitychanged'>(navigator.bluetooth, 'availabilitychanged', () => {
    void updateBluetoothAvailability()
  })

  tryOnMounted(async () => {
    await updateBluetoothAvailability()
    await device.value?.gatt?.connect()
  })

  tryOnUnmounted(() => {
    device.value?.gatt?.disconnect()
  })

  return {
    isSupported,
    isAvailable: computed(() => isAvailable.value),
    isConnected,
    device,
    server,
    error: computed(() => error.value),
    requestDevice,
  }
}

export default useBluetooth
