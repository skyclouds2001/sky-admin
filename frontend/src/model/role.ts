/**
 * 角色数据结构
 */
interface Role {
  /** 角色 ID */
  id: number
  /** 角色标题 */
  title: string
  /** 角色描述 */
  description: string
  /** 数据创建时间 */
  createdAt: string
  /** 数据更新时间 */
  updatedAt: string
}

export default Role
