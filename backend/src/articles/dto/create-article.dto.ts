import { ApiProperty } from '@nestjs/swagger'
import { ArticleStatus } from '@prisma/client'
import { IsEnum, IsInt, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'

export class CreateArticleDto {
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  @ApiProperty({
    description: '文章标题',
    minLength: 5,
    maxLength: 25,
  })
  title: string

  @IsString()
  @MaxLength(250)
  @IsOptional()
  @ApiProperty({
    description: '文章描述',
    maxLength: 250,
    required: false,
  })
  description?: string

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: '文章作者ID',
    minimum: 0,
    exclusiveMinimum: true,
  })
  authorId: number

  @IsInt()
  @Min(0)
  @Max(5)
  @ApiProperty({
    description: '文章星级',
    minimum: 0,
    maximum: 5,
  })
  star: number

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: '文章阅读量',
    minimum: 0,
    exclusiveMinimum: true,
  })
  read: number

  @IsEnum(ArticleStatus)
  @IsOptional()
  @ApiProperty({
    description: '文章发布状态',
    enum: ArticleStatus,
    default: 'Drafted',
    required: false,
  })
  status: ArticleStatus = 'Drafted'
}
