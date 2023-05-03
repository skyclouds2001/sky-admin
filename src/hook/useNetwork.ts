import { ref, readonly, onMounted, onUnmounted } from 'vue'

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation
}

interface NetworkInformation extends EventTarget {
  downlink: number
  effectiveType: NetworkEffectiveType
  rtt: number
  saveData: boolean
  type: NetworkType
  downlinkMax: number
  onchange: EventListenerOrEventListenerObject
  addEventListener: (type: 'change', callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean) => void
  removeEventListener: (type: 'change', callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean) => void
}

/**
 * 网络类型
 */
type NetworkType = 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown'

/**
 * 网络作用类型
 */
type NetworkEffectiveType = 'slow-2g' | '2g' | '3g' | '4g' | undefined

const useNetwork = (): {
  isSupported: boolean
  connection: Readonly<{
    downlink?: number
    downlinkMax?: number
    type?: NetworkType
    effectiveType?: NetworkEffectiveType
    rtt?: number
    saveData?: boolean
  }>
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
   * 网络连接数据
   */
  const connection = readonly({
    downlink,
    downlinkMax,
    type,
    effectiveType,
    rtt,
    saveData,
  })

  /**
   * 更新网络连接状态
   * @param connection 网络连接对象
   */
  const updateConnectionStatus = (connection?: NetworkInformation): void => {
    downlink.value = connection?.downlink
    downlinkMax.value = connection?.downlinkMax
    type.value = connection?.type
    effectiveType.value = connection?.effectiveType
    rtt.value = connection?.rtt !== undefined ? connection.rtt * 0.025 : undefined
    saveData.value = connection?.saveData
  }

  /**
   * 网络连接状态改变回调方法
   * @param e 回调事件
   */
  const handleConnectionChange: EventListener = (e) => {
    updateConnectionStatus(e.target as NetworkInformation)
  }

  onMounted(() => {
    const connection = (navigator as NavigatorWithConnection).connection

    updateConnectionStatus(connection)

    connection?.addEventListener('change', handleConnectionChange)
  })

  onUnmounted(() => {
    const connection = (navigator as NavigatorWithConnection).connection

    connection?.removeEventListener('change', handleConnectionChange)
  })

  return {
    isSupported,
    connection,
  }
}

export default useNetwork
