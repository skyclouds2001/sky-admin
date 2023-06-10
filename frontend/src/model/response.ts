/**
 * 请求成功响应数据结构
 */
interface Response<T = unknown> {
  /** 请求成功标识 */
  success: boolean
  /** 请求码 */
  code: number
  /** 请求信息 */
  message: string
  /** 请求数据 */
  data: T
}

export default Response
