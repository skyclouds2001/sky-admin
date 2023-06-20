import { ApiProperty } from '@nestjs/swagger'
import { ArticleStatus, Article } from '@prisma/client'
import { UserEntity } from 'src/users/entities/user.entity'

export class ArticleEntity implements Article {
  constructor({ author, ...article }: Partial<ArticleEntity>) {
    Object.assign(this, article)
    if (author !== null) this.author = new UserEntity(author)
  }

  @ApiProperty({
    description: '文章ID',
  })
  id: number

  @ApiProperty({
    description: '文章标题',
    minLength: 5,
  })
  title: string

  @ApiProperty({
    description: '文章描述',
    required: false,
    nullable: true,
    maxLength: 250,
  })
  description: string | null

  @ApiProperty({
    description: '文章作者ID',
    required: false,
    nullable: true,
  })
  authorId: number | null

  @ApiProperty({
    type: UserEntity,
    description: '文章作者信息',
    required: false,
  })
  author?: UserEntity

  @ApiProperty({
    description: '文章星级',
    minimum: 0,
    maximum: 5,
  })
  star: number

  @ApiProperty({
    description: '文章阅读量',
  })
  read: number

  @ApiProperty({
    description: '文章发布状态',
    required: false,
    default: 'Drafted',
    enum: ArticleStatus,
  })
  status: ArticleStatus

  @ApiProperty({
    description: '文章创建时间',
  })
  createdAt: Date

  @ApiProperty({
    description: '文章更新时间',
  })
  updatedAt: Date
}
