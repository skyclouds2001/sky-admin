import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  count() {
    return this.prisma.article.count()
  }

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: createArticleDto,
    })
  }

  findAll() {
    return this.prisma.article.findMany()
  }

  findPage(page: number, size: number) {
    return this.prisma.article.findMany({
      skip: (page - 1) * size,
      take: size,
    })
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    })
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: {
        id,
      },
      data: updateArticleDto,
    })
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: {
        id,
      },
    })
  }
}
