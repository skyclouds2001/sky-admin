import { ApiProperty } from '@nestjs/swagger'
import { ArticleStatus } from '@prisma/client'
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({ required: false })
  description?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  author: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  reviewer: string

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  @ApiProperty()
  star: number

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  read: number

  @IsEnum(ArticleStatus)
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false, default: 'Drafted', enum: [ArticleStatus.Drafted, ArticleStatus.Published] })
  status: ArticleStatus = 'Drafted'
}
