import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ArticlesService } from './articles.service'
import { type CreateArticleDto } from './dto/create-article.dto'
import { type UpdateArticleDto } from './dto/update-article.dto'
import { ArticleEntity } from './entities/article.entity'
import { ParseIntPipe } from '@nestjs/common/pipes'

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  create(@Body() createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    return this.articlesService.create(createArticleDto)
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findAll(): Promise<ArticleEntity[]> {
    return this.articlesService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ArticleEntity> {
    return this.articlesService.findOne(id)
  }

  @Put(':id')
  @ApiOkResponse({ type: ArticleEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto): Promise<ArticleEntity> {
    return this.articlesService.update(id, updateArticleDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  remove(@Param('id', ParseIntPipe) id: number): Promise<ArticleEntity> {
    return this.articlesService.remove(id)
  }
}
