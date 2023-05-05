import { onMounted, onBeforeUnmount, reactive, readonly } from 'vue'

type NavigatorWithBattery = Navigator & {
  getBattery: () => Promise<BatteryManager>
}

interface BatteryManager extends EventTarget {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
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

  /**
   * 电池状态改变回调方法
   * @param e 回调事件
   */
  const handleBatteryInfoChange: EventListener = (e) => {
    updateBatteryInfo(e.target as BatteryManager)
  }

  if (isSupported) {
    void (window.navigator as NavigatorWithBattery).getBattery().then((batteryManager) => {
      updateBatteryInfo(batteryManager)
    })
  }

  onMounted(async () => {
    if (isSupported) {
      const batteryManager = await (window.navigator as NavigatorWithBattery).getBattery()

      batteryManager.addEventListener('chargingchange', handleBatteryInfoChange)
      batteryManager.addEventListener('levelchange', handleBatteryInfoChange)
      batteryManager.addEventListener('chargingtimechange', handleBatteryInfoChange)
      batteryManager.addEventListener('dischargingtimechange', handleBatteryInfoChange)
    }
  })

  onBeforeUnmount(async () => {
    if (isSupported) {
      const batteryManager = await (navigator as NavigatorWithBattery).getBattery()

      batteryManager.removeEventListener('chargingchange', handleBatteryInfoChange)
      batteryManager.removeEventListener('levelchange', handleBatteryInfoChange)
      batteryManager.removeEventListener('chargingtimechange', handleBatteryInfoChange)
      batteryManager.removeEventListener('dischargingtimechange', handleBatteryInfoChange)
    }
  })

  return {
    battery: readonly(battery),
    isSupported,
  }
}

export default useBattery
