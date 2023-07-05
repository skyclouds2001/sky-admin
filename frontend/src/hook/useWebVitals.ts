import { ref, type Ref } from 'vue'
import { type CLSMetric, type FIDMetric, type LCPMetric, onLCP, onFID, onCLS } from 'web-vitals'

const useWebVitals = (): {
  LCPs: Ref<LCPMetric[]>
  FIDs: Ref<FIDMetric[]>
  CLSs: Ref<CLSMetric[]>
} => {
  /**
   * Largest Contentful Paint | LCP | 最大内容绘制
   * 测量加载性能
   */
  const LCPs = ref<LCPMetric[]>([])

  /**
   * First Input Delay | FID | 首次输入延迟
   * 测量交互性
   */
  const FIDs = ref<FIDMetric[]>([])

  /**
   * Cumulative Layout Shift | CLS | 累积布局偏移
   * 测量视觉稳定性
   */
  const CLSs = ref<CLSMetric[]>([])

  onLCP((metric) => {
    LCPs.value.push(metric as LCPMetric)
  })

  onFID((metric) => {
    FIDs.value.push(metric as FIDMetric)
  })

  onCLS((metric) => {
    CLSs.value.push(metric as CLSMetric)
  })

  return {
    LCPs,
    FIDs,
    CLSs,
  }
}

export default useWebVitals
