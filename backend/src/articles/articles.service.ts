import { Injectable } from '@nestjs/common'
import { type CreateArticleDto } from './dto/create-article.dto'
import { type UpdateArticleDto } from './dto/update-article.dto'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from 'src/prisma/prisma.service'
import { type ArticleEntity } from './entities/article.entity'

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    return this.prisma.article.create({
      data: createArticleDto,
    })
  }

  findAll(): Promise<ArticleEntity[]> {
    return this.prisma.article.findMany()
  }

  findOne(id: number): Promise<ArticleEntity> {
    return this.prisma.article.findUnique({
      where: {
        id,
      },
    })
  }

  update(id: number, updateArticleDto: UpdateArticleDto): Promise<ArticleEntity> {
    return this.prisma.article.update({
      where: {
        id,
      },
      data: updateArticleDto,
    })
  }

  remove(id: number): Promise<ArticleEntity> {
    return this.prisma.article.delete({
      where: {
        id,
      },
    })
  }
}
