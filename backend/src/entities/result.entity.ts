import { ApiProperty } from '@nestjs/swagger'

export class Result<T = unknown> {
  @ApiProperty({
    description: '响应状态',
  })
  public readonly success: boolean

  @ApiProperty({
    description: '响应码',
  })
  public readonly code: number

  @ApiProperty({
    description: '响应信息',
  })
  public readonly message: string

  @ApiProperty({
    description: '响应数据',
  })
  public readonly data: T

  public constructor(data: T, message: string, code: number, success: boolean) {
    this.data = data
    this.message = message
    this.code = code
    this.success = success
  }

  public static success<T = unknown>(data: T = null, message = 'SUCCESS') {
    return new Result<T>(data, message, 0, true)
  }

  public static fail<T = unknown>(data: T = null, message = 'FAIL', code = -1) {
    return new Result<T>(data, message, code, false)
  }
}
