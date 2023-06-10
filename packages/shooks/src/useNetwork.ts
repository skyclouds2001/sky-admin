import { readonly, ref } from 'vue'
import { useEventListener } from '.'

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

const useNetwork = (): {
  isSupported: boolean
  connection: Readonly<Partial<NetworkInformation>>
} => {
  /**
   * 标记 Navigator.connection 是否支持
   */
  const isSupported = 'connection' in navigator

  /**
   * 网络带宽
   */
  const downlink = ref<number>()

  /**
   * 网络最大带宽
   */
  const downlinkMax = ref<number>()

  /**
   * 网络最大带宽
   */
  const type = ref<NetworkType>()

  /**
   * 网络作用类型
   */
  const effectiveType = ref<NetworkEffectiveType>()

  /**
   * 网络往返时延
   */
  const rtt = ref<number>()

  /**
   * 用户是否设定减少数据使用
   */
  const saveData = ref<boolean>()

  /**
   * 更新网络连接状态
   * @param connection 网络连接对象
   */
  const updateConnectionStatus = (connection: NetworkInformation): void => {
    downlink.value = connection.downlink
    downlinkMax.value = connection.downlinkMax
    type.value = connection.type
    effectiveType.value = connection.effectiveType
    rtt.value = connection.rtt * 0.025
    saveData.value = connection.saveData
  }

  if (isSupported) {
    const connection = (window.navigator as NavigatorWithConnection).connection

    updateConnectionStatus(connection)

    useEventListener<NetworkInformation, NetworkInformationEventMap, 'change'>(connection, 'change', (e) => {
      updateConnectionStatus(e.target as NetworkInformation)
    })
  }

  return {
    isSupported,
    connection: readonly({
      downlink,
      downlinkMax,
      type,
      effectiveType,
      rtt,
      saveData,
    }),
  }
}

export default useNetwork
