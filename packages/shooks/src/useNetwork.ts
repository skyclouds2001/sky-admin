import { reactive, readonly } from 'vue'
import { useEventListener } from '.'

const useNetwork = (): {
  isSupported: boolean
  connection: Readonly<{
    downlink: number | null
    effectiveType: NetworkEffectiveType | null
    rtt: number | null
    saveData: boolean | null
    type: NetworkType | null
    downlinkMax: number | null
  }>
} => {
  /**
   * 标记 Navigator.connection 是否支持
   */
  const isSupported = 'connection' in navigator

  /**
   * 网络连接状态对象
   */
  const connection = reactive<{
    downlink: number | null
    effectiveType: NetworkEffectiveType | null
    rtt: number | null
    saveData: boolean | null
    type: NetworkType | null
    downlinkMax: number | null
  }>({
    downlink: null,
    downlinkMax: null,
    type: null,
    effectiveType: null,
    rtt: null,
    saveData: null,
  })

  /**
   * 更新网络连接状态
   * @param information 网络连接对象
   */
  const updateNetworkInformation = (information: NetworkInformation): void => {
    connection.downlink = information.downlink
    connection.downlinkMax = information.downlinkMax
    connection.type = information.type
    connection.effectiveType = information.effectiveType
    connection.rtt = information.rtt * 0.025
    connection.saveData = information.saveData
  }

  if (isSupported) {
    const connection = (navigator as NavigatorWithConnection).connection

    updateNetworkInformation(connection)

    useEventListener<NetworkInformation, NetworkInformationEventMap, 'change'>(connection, 'change', () => {
      updateNetworkInformation(connection)
    })
  }

  return {
    isSupported,
    connection: readonly(connection),
  }
}

export default useNetwork

type NavigatorWithConnection = Navigator & {
  connection: NetworkInformation
}

interface NetworkInformation extends EventTarget {
  downlink: number
  effectiveType: NetworkEffectiveType
  rtt: number
  saveData: boolean
  type: NetworkType
  downlinkMax: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addEventListener: (<K extends keyof NetworkInformationEventMap>(type: K, listener: (this: NetworkInformation, ev: NetworkInformationEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeEventListener: (<K extends keyof NetworkInformationEventMap>(type: K, listener: (this: NetworkInformation, ev: NetworkInformationEventMap[K]) => any, options?: boolean | EventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void)
}

/**
 * 网络类型
 */
type NetworkType = 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown'

/**
 * 网络作用类型
 */
type NetworkEffectiveType = 'slow-2g' | '2g' | '3g' | '4g' | undefined

interface NetworkInformationEventMap {
  change: Event
}
