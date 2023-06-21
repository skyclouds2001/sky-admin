import { ApiProperty } from '@nestjs/swagger'
import { ArticleStatus } from '@prisma/client'
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    description: '文章标题',
    minLength: 5,
  })
  title: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: '文章描述',
    required: false,
    maxLength: 250,
  })
  description?: string

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: '文章作者ID',
  })
  authorId: number

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  @ApiProperty({
    description: '文章星级',
    minimum: 0,
    maximum: 5,
  })
  star: number

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: '文章阅读量',
  })
  read: number

  @IsEnum(ArticleStatus)
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: '文章发布状态',
    required: false,
    default: 'Drafted',
    enum: ArticleStatus,
  })
  status: ArticleStatus = 'Drafted'
}
