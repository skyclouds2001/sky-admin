import { ApiProperty } from '@nestjs/swagger'
import { type ArticleStatus, type Article } from '@prisma/client'
import { UserEntity } from 'src/users/entities/user.entity'

export class ArticleEntity implements Article {
  constructor({ author, ...article }: Partial<ArticleEntity>) {
    Object.assign(this, article)
    if (author !== null) this.author = new UserEntity(author)
  }

  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty({ required: false, nullable: true })
  description: string | null

  @ApiProperty({ required: false, nullable: true })
  authorId: number | null

  @ApiProperty({ required: false, type: UserEntity })
  author?: UserEntity

  @ApiProperty()
  star: number

  @ApiProperty()
  read: number

  @ApiProperty()
  status: ArticleStatus

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
