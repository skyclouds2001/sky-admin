import { ApiProperty } from '@nestjs/swagger'

export class ServerEntity {
  @ApiProperty({
    description: '用户IP地址',
  })
  ip: string

  @ApiProperty({
    description: '可用系统内存量',
  })
  freemem: number

  @ApiProperty({
    description: '操作系统主机名',
  })
  hostname: string

  @ApiProperty({
    description: '机器类型',
  })
  machine: string

  @ApiProperty({
    description: '操作系统版本',
  })
  release: string

  @ApiProperty({
    description: '系统内存总量',
  })
  totalmem: number

  @ApiProperty({
    description: '操作系统名称',
  })
  type: string

  @ApiProperty({
    description: '系统正常运行时间',
  })
  uptime: number

  @ApiProperty({
    description: '用户名称',
  })
  username: string

  @ApiProperty({
    description: '内核版本',
  })
  version: string

  @ApiProperty({
    description: '服务运行时间',
  })
  nodeUptime: number

  @ApiProperty({
    description: '服务运行环境版本',
  })
  nodeVersion: string
}
