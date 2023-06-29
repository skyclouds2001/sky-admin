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

declare global {
  interface Window {
    Bluetooth: Bluetooth
    BluetoothCharacteristicProperties: BluetoothCharacteristicProperties
    BluetoothDevice: BluetoothDevice
    BluetoothRemoteGATTCharacteristic: BluetoothRemoteGATTCharacteristic
    BluetoothRemoteGATTDescriptor: BluetoothRemoteGATTDescriptor
    BluetoothRemoteGATTServer: BluetoothRemoteGATTServer
    BluetoothRemoteGATTService: BluetoothRemoteGATTService
    BluetoothUUID: BluetoothUUID
  }

  interface Navigator {
    readonly bluetooth: Bluetooth
  }

  interface Bluetooth extends EventTarget {
    getAvailability: () => Promise<boolean>
    requestDevice: (options?: {
      filters?: Array<{
        services: string[]
        name: string
        namePrefix: string
      }>
      optionalServices?: string[]
      acceptAllDevices?: boolean
    }) => Promise<BluetoothDevice>
  }

  interface BluetoothDevice extends EventTarget {
    id: string
    name: string
    gatt: BluetoothRemoteGATTServer
  }

  interface BluetoothRemoteGATTServer {
    connected: boolean
    device: BluetoothDevice
    connect: () => Promise<BluetoothRemoteGATTServer>
    disconnect: () => void
    getPrimaryService: (bluetoothServiceUUID: string) => Promise<BluetoothRemoteGATTService>
    getPrimaryServices: (bluetoothServiceUUID: string) => Promise<BluetoothRemoteGATTService>
  }

  interface BluetoothRemoteGATTService extends EventTarget {
    device: BluetoothDevice
    isPrimary: boolean
    uuid: string
    getCharacteristic: (characteristic: string) => Promise<BluetoothRemoteGATTCharacteristic>
    getCharacteristics: (characteristic: string) => Promise<BluetoothRemoteGATTCharacteristic[]>
  }

  interface BluetoothRemoteGATTCharacteristic extends EventTarget {
    properties: BluetoothCharacteristicProperties
    service: BluetoothRemoteGATTService
    uuid: string
    value: BluetoothRemoteGATTCharacteristic
    getDescriptor: () => Promise<BluetoothRemoteGATTDescriptor>
    getDescriptors: () => Promise<BluetoothRemoteGATTDescriptor[]>
    readValue: () => Promise<DataView>
    startNotifications: () => Promise<BluetoothRemoteGATTCharacteristic>
    stopNotifications: () => void
    writeValue: (value: ArrayBuffer) => Promise<void>
    writeValueWithoutResponse: (value: ArrayBuffer) => Promise<void>
    writeValueWithResponse: (value: ArrayBuffer) => Promise<void>
  }

  interface BluetoothCharacteristicProperties {
    authenticatedSignedWrites: boolean
    broadcast: boolean
    indicate: boolean
    notify: boolean
    read: boolean
    reliableWrite: boolean
    writableAuxiliaries: boolean
    write: boolean
    writeWithoutResponse: boolean
  }

  interface BluetoothRemoteGATTDescriptor {
    characteristic: BluetoothRemoteGATTCharacteristic
    uuid: string
    value: ArrayBuffer
    readValue: () => Promise<ArrayBuffer>
    writeValue: (array: ArrayBuffer) => Promise<void>
  }

  interface BluetoothUUID {
    canonicalUUID: (alias: string) => string
    getCharacteristic: (name: string) => string
    getDescriptor: (name: string) => string
    getService: (name: string) => string
  }
}

interface BluetoothEventMap {
  availabilitychanged: Event
}
