/**
 * 用户数据结构
 */
interface User {
  /** 用户ID */
  id: number
  /** 用户姓名 */
  name: string
  /** 用户邮箱 */
  email: string
  /** 数据创建时间 */
  createdAt: string
  /** 数据更新时间 */
  updatedAt: string
}

export default User
