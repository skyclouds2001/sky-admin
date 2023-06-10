import { reactive, readonly } from 'vue'
import { useEventListener } from '@/hook'

type NavigatorWithBattery = Navigator & {
  getBattery: () => Promise<BatteryManager>
}

interface BatteryManager extends EventTarget {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
}

interface BatteryManagerEventMap {
  chargingchange: Event
  chargingtimechange: Event
  dischargingtimechange: Event
  levelchange: Event
}

const useBattery = (): {
  isSupported: boolean
  battery: Readonly<Partial<BatteryManager>>
} => {
  /**
   * 是否支持电池API
   */
  const isSupported = 'getBattery' in window.navigator

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
    void (window.navigator as NavigatorWithBattery).getBattery().then((batteryManager) => {
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
