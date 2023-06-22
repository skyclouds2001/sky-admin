import { http } from '@/lib'
import type { Response } from '@/model'

/**
 * 登录方法
 * @param email 账号
 * @param password 密码
 * @returns token
 */
export const login = (email: string, password: string): Promise<Response<{ accessToken: string }>> =>
  http.post('/api/auth/login', {
    email,
    password,
  })
