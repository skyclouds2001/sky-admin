declare var NetworkInformation: NetworkInformation

interface Navigator {
  readonly connection: NetworkInformation
}

interface NetworkInformation extends EventTarget {
  downlink: number
  effectiveType: NetworkEffectiveType
  rtt: number
  saveData: boolean
  type: NetworkType
  downlinkMax: number
  onchange: ((this: NetworkInformation, ev: Event) => any) | null
  addEventListener: (<K extends keyof NetworkInformationEventMap>(type: K, listener: (this: NetworkInformation, ev: NetworkInformationEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void)
  removeEventListener: (<K extends keyof NetworkInformationEventMap>(type: K, listener: (this: NetworkInformation, ev: NetworkInformationEventMap[K]) => any, options?: boolean | EventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void)
}

type NetworkType = 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown'

type NetworkEffectiveType = 'slow-2g' | '2g' | '3g' | '4g' | undefined

interface NetworkInformationEventMap {
  change: Event
}
