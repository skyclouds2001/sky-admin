declare var Bluetooth: Bluetooth
declare var BluetoothCharacteristicProperties: BluetoothCharacteristicProperties
declare var BluetoothDevice: BluetoothDevice
declare var BluetoothRemoteGATTCharacteristic: BluetoothRemoteGATTCharacteristic
declare var BluetoothRemoteGATTDescriptor: BluetoothRemoteGATTDescriptor
declare var BluetoothRemoteGATTServer: BluetoothRemoteGATTServer
declare var BluetoothRemoteGATTService: BluetoothRemoteGATTService
declare var BluetoothUUID: BluetoothUUID

interface Navigator {
  readonly bluetooth: Bluetooth
}

interface Bluetooth extends EventTarget {
  getAvailability: () => Promise<boolean>
  getDevices: () => Promise<BluetoothDevice[]>
  requestDevice: (options?: {
    filters?: Array<{
      services: string[]
      name: string
      namePrefix: string
    }>
    optionalServices?: string[]
    acceptAllDevices?: boolean
  }) => Promise<BluetoothDevice>
  addEventListener: <K extends keyof BluetoothEventMap>(type: K, listener: (this: Bluetooth, ev: BluetoothEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => void
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void
  removeEventListener: <K extends keyof BluetoothEventMap>(type: K, listener: (this: Bluetooth, ev: BluetoothEventMap[K]) => any, options?: boolean | EventListenerOptions) => void
  removeEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void
}

interface BluetoothEventMap {
  availabilitychanged: Event
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
