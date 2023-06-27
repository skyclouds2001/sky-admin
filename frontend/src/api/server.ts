import { http } from '@/lib'
import type { Response } from '@/model'

/**
 * 获取服务器信息方法
 * @returns server info
 */
export const getServerInfo = (): Promise<
  Response<{
    ip: string
    freemem: number
    hostname: string
    machine: string
    release: string
    totalmem: number
    type: string
    uptime: number
    username: string
    version: string
    nodeUptime: number
    nodeVersion: string
  }>
> => http.get('/api/server')
