import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ArticlesService } from './articles.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { ArticleEntity } from './entities/article.entity'

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    return new ArticleEntity(await this.articlesService.create(createArticleDto))
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll(): Promise<ArticleEntity[]> {
    return (await this.articlesService.findAll()).map((article) => new ArticleEntity(article))
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ArticleEntity> {
    return new ArticleEntity(await this.articlesService.findOne(id))
  }

  @Put(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto): Promise<ArticleEntity> {
    return new ArticleEntity(await this.articlesService.update(id, updateArticleDto))
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ArticleEntity> {
    return new ArticleEntity(await this.articlesService.remove(id))
  }
}
