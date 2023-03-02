/**
 * 浏览器及平台信息数据结构
 */
interface BrowserInfo {
  /** 系统 */
  system: string
  /** 系统版本 */
  systemVs: string
  /** 平台 */
  platform: string
  /** 内核 */
  engine: string
  /** 内核版本 */
  engineVs: string
  /** 载体 */
  supporter: string
  /** 载体版本 */
  supporterVs: string
  /** 外壳 */
  shell: string
  /** 外壳版本 */
  shellVs: string
}

export default BrowserInfo
