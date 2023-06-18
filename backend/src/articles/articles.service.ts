import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { ArticleEntity } from './entities/article.entity'

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
      include: {
        author: true,
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