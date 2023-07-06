import { reactive, readonly } from 'vue'
import { useEventListener } from '.'

const useBattery = (): {
  isSupported: boolean
  battery: Readonly<Partial<BatteryManager>>
} => {
  /**
   * 是否支持电池API
   */
  const isSupported = 'getBattery' in navigator

  /**
   * 电池信息
   */
  const battery = reactive<Partial<BatteryManager>>({
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 100,
  })

  /**
   * 更新电池信息方法
   * @param batteryManager 电池信息管理器
   */
  const updateBatteryInfo = (batteryManager: BatteryManager): void => {
    battery.charging = batteryManager.charging
    battery.chargingTime = batteryManager.chargingTime
    battery.dischargingTime = batteryManager.dischargingTime
    battery.level = batteryManager.level * 100
  }

  if (isSupported) {
    void navigator.getBattery().then((batteryManager) => {
      updateBatteryInfo(batteryManager)

      useEventListener<BatteryManager, BatteryManagerEventMap, 'chargingchange'>(batteryManager, 'chargingchange', (e) => {
        updateBatteryInfo(e.target as BatteryManager)
      })
      useEventListener<BatteryManager, BatteryManagerEventMap, 'levelchange'>(batteryManager, 'levelchange', (e) => {
        updateBatteryInfo(e.target as BatteryManager)
      })
      useEventListener<BatteryManager, BatteryManagerEventMap, 'chargingtimechange'>(batteryManager, 'chargingtimechange', (e) => {
        updateBatteryInfo(e.target as BatteryManager)
      })
      useEventListener<BatteryManager, BatteryManagerEventMap, 'dischargingtimechange'>(batteryManager, 'dischargingtimechange', (e) => {
        updateBatteryInfo(e.target as BatteryManager)
      })
    })
  }

  return {
    battery: readonly(battery),
    isSupported,
  }
}

export default useBattery

declare global {
  let BatteryManager: BatteryManager

  interface Window {
    BatteryManager: BatteryManager
  }

  interface Navigator {
    getBattery: () => Promise<BatteryManager>
  }

  interface BatteryManager extends EventTarget {
    charging: boolean
    chargingTime: number
    dischargingTime: number
    level: number
    onchargingchange: ((this: BatteryManager, ev: Event) => any) | null
    onchargingtimechange: ((this: BatteryManager, ev: Event) => any) | null
    ondischargingtimechange: ((this: BatteryManager, ev: Event) => any) | null
    onlevelchange: ((this: BatteryManager, ev: Event) => any) | null
    addEventListener: (<K extends keyof BatteryManagerEventMap>(type: K, listener: (this: BatteryManager, ev: BatteryManagerEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void)
    removeEventListener: (<K extends keyof BatteryManagerEventMap>(type: K, listener: (this: BatteryManager, ev: BatteryManagerEventMap[K]) => any, options?: boolean | EventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void)
  }
}

interface BatteryManagerEventMap {
  chargingchange: Event
  chargingtimechange: Event
  dischargingtimechange: Event
  levelchange: Event
}
