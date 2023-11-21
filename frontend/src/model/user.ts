import type { Department, Role } from '@/model'

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
  /** 用户所属部门 ID */
  departmentId: number
  /** 用户所属部门信息 */
  department: Department
  /** 用户所属角色 ID */
  roleId: number
  /** 用户所属角色信息 */
  role: Role
  /** 数据创建时间 */
  createdAt: string
  /** 数据更新时间 */
  updatedAt: string
}

export default User
