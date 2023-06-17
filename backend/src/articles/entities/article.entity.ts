import { ApiProperty } from '@nestjs/swagger'
import { type ArticleStatus, type Article } from '@prisma/client'

export class ArticleEntity implements Article {
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty({ required: false, nullable: true })
  description: string | null

  @ApiProperty({ required: false, nullable: true })
  authorId: number | null

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
