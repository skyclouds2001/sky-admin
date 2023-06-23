import { ApiProperty } from '@nestjs/swagger'

export class Pagination<T = unknown> {
  @ApiProperty({
    description: '数据',
  })
  public readonly data: T[]

  @ApiProperty({
    description: '分页页码',
  })
  public readonly page: number

  @ApiProperty({
    description: '分页容量',
  })
  public readonly size: number

  @ApiProperty({
    description: '数据总数',
  })
  public readonly total: number

  public constructor(data: T[], page: number, size: number, total: number) {
    this.data = data
    this.page = page
    this.size = size
    this.total = total
  }
}
