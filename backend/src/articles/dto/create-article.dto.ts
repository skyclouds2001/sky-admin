import { ApiProperty } from '@nestjs/swagger'
import { ArticleStatus } from '@prisma/client'

export class CreateArticleDto {
  @ApiProperty()
  title: string

  @ApiProperty({ required: false })
  description?: string

  @ApiProperty()
  author: string

  @ApiProperty()
  reviewer: string

  @ApiProperty()
  star: number

  @ApiProperty()
  read: number

  @ApiProperty({ required: false, default: 'Drafted', enum: [ArticleStatus.Drafted, ArticleStatus.Published] })
  status: ArticleStatus
}
