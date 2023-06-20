import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger'
import { ArticlesService } from './articles.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { ArticleEntity } from './entities/article.entity'

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiBody({
    type: CreateArticleDto,
    description: '待添加的文章信息',
  })
  @ApiCreatedResponse({
    type: ArticleEntity,
    description: '文章信息',
  })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return new ArticleEntity(await this.articlesService.create(createArticleDto))
  }

  @Get()
  @ApiOkResponse({
    type: ArticleEntity,
    isArray: true,
    description: '文章信息列表',
  })
  async findAll() {
    return (await this.articlesService.findAll()).map((article) => new ArticleEntity(article))
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '文章ID',
  })
  @ApiOkResponse({
    type: ArticleEntity,
    description: '文章信息',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new ArticleEntity(await this.articlesService.findOne(id))
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: '文章ID',
  })
  @ApiBody({
    type: UpdateArticleDto,
    description: '待更新的用户信息',
  })
  @ApiOkResponse({
    type: ArticleEntity,
    description: '文章信息',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return new ArticleEntity(await this.articlesService.update(id, updateArticleDto))
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '文章ID',
  })
  @ApiOkResponse({
    type: ArticleEntity,
    description: '文章信息',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ArticleEntity(await this.articlesService.remove(id))
  }
}
