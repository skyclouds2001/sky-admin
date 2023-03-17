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
  battery: Readonly<Pick<BatteryManager, 'charging' | 'chargingTime' | 'dischargingTime' | 'level'>>
  isSupported: boolean
} => {
  const battery = reactive<Pick<BatteryManager, 'charging' | 'chargingTime' | 'dischargingTime' | 'level'>>({
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 100,
  })

  const batteryInfo = readonly(battery)

  const isSupported = 'getBattery' in navigator

  const updateBatteryInfo = (e: Event): void => {
    const batteryManager = e.target as BatteryManager
    battery.charging = batteryManager.charging
    battery.chargingTime = batteryManager.chargingTime
    battery.dischargingTime = batteryManager.dischargingTime
    battery.level = batteryManager.level * 100
  }

  onMounted(async () => {
    const batteryManager: BatteryManager = await (window.navigator as NavigatorWithBattery).getBattery()

    battery.charging = batteryManager.charging
    battery.chargingTime = batteryManager.chargingTime
    battery.dischargingTime = batteryManager.dischargingTime
    battery.level = batteryManager.level * 100

    batteryManager.addEventListener('chargingchange', updateBatteryInfo)
    batteryManager.addEventListener('levelchange', updateBatteryInfo)
    batteryManager.addEventListener('chargingtimechange', updateBatteryInfo)
    batteryManager.addEventListener('dischargingtimechange', updateBatteryInfo)
  })

  onBeforeUnmount(async () => {
    const batteryManager: BatteryManager = await (window.navigator as NavigatorWithBattery).getBattery()

    batteryManager.removeEventListener('chargingchange', updateBatteryInfo)
    batteryManager.removeEventListener('levelchange', updateBatteryInfo)
    batteryManager.removeEventListener('chargingtimechange', updateBatteryInfo)
    batteryManager.removeEventListener('dischargingtimechange', updateBatteryInfo)
  })

  return {
    battery: batteryInfo,
    isSupported,
  }
}

export default useBattery
