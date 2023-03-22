import { reactive, readonly, onMounted, onBeforeUnmount } from 'vue'

interface NavigatorWithBattery extends Navigator {
  getBattery: () => Promise<BatteryManager>
}

interface BatteryManager extends EventTarget {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
  onchargingchange: EventListenerOrEventListenerObject | null
  onchargingtimechange: EventListenerOrEventListenerObject | null
  ondischargingtimechange: EventListenerOrEventListenerObject | null
  onlevelchange: EventListenerOrEventListenerObject | null
  addEventListener: (type: 'chargingchange' | 'levelchange' | 'chargingtimechange' | 'dischargingtimechange', listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void
  removeEventListener: (type: 'chargingchange' | 'levelchange' | 'chargingtimechange' | 'dischargingtimechange', listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void
}

const useBattery = (): {
  isSupported: boolean
  battery: Readonly<{
    charging?: boolean
    chargingTime?: number
    dischargingTime?: number
    level?: number
  }>
} => {
  /**
   * 电池信息
   */
  const battery = reactive<{
    charging?: boolean
    chargingTime?: number
    dischargingTime?: number
    level?: number
  }>({
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 100,
  })

  /**
   * 电池信息（只读）
   */
  const batteryInfo = readonly(battery)

  /**
   * 是否支持电池API
   */
  const isSupported = 'getBattery' in navigator

  /**
   * 更新电池信息方法
   *
   * @param batteryManager 电池信息管理器
   */
  const updateBatteryInfo = (batteryManager?: BatteryManager): void => {
    battery.charging = batteryManager?.charging
    battery.chargingTime = batteryManager?.chargingTime
    battery.dischargingTime = batteryManager?.dischargingTime
    battery.level = batteryManager?.level !== undefined ? batteryManager.level * 100 : batteryManager?.level
  }

  /**
   * 电池状态改变回调方法
   *
   * @param e 回调事件
   */
  const handleBatteryInfoChange: EventListener = (e) => {
    updateBatteryInfo(e.target as BatteryManager)
  }

  onMounted(async () => {
    const batteryManager: BatteryManager = await (window.navigator as NavigatorWithBattery).getBattery?.()

    updateBatteryInfo(batteryManager)

    batteryManager?.addEventListener('chargingchange', handleBatteryInfoChange)
    batteryManager?.addEventListener('levelchange', handleBatteryInfoChange)
    batteryManager?.addEventListener('chargingtimechange', handleBatteryInfoChange)
    batteryManager?.addEventListener('dischargingtimechange', handleBatteryInfoChange)
  })

  onBeforeUnmount(async () => {
    const batteryManager: BatteryManager = await (navigator as NavigatorWithBattery).getBattery?.()

    batteryManager?.removeEventListener('chargingchange', handleBatteryInfoChange)
    batteryManager?.removeEventListener('levelchange', handleBatteryInfoChange)
    batteryManager?.removeEventListener('chargingtimechange', handleBatteryInfoChange)
    batteryManager?.removeEventListener('dischargingtimechange', handleBatteryInfoChange)
  })

  return {
    battery: batteryInfo,
    isSupported,
  }
}

export default useBattery
