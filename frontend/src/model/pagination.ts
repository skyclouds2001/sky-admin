/**
 * 分页数据数据结构
 */
interface Pagination<T = unknown> {
  /** 数据 */
  data: T[]
  /** 分页页码 */
  page: number
  /** 分页容量 */
  size: number
  /** 数据总数 */
  total: string
}

export default Pagination
