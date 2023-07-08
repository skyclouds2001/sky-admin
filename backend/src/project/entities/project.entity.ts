import { ApiProperty } from '@nestjs/swagger'

export class ProjectEntity {
  @ApiProperty({
    description: '项目仓库ID',
  })
  id: number

  @ApiProperty({
    description: '项目仓库名称',
  })
  name: string

  @ApiProperty({
    description: '项目仓库描述',
  })
  description: string

  @ApiProperty({
    description: '项目仓库fork数量',
  })
  forks_count: number

  @ApiProperty({
    description: '项目仓库watcher数量',
  })
  watchers_count: number

  @ApiProperty({
    description: '项目仓库star数量',
  })
  stargazers_count: number
}
