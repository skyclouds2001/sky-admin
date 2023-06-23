import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Query, DefaultValuePipe, HttpStatus, HttpCode } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { ArticlesService } from './articles.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { ArticleEntity } from './entities/article.entity'
import { Pagination } from 'src/entities/pagination.entity'

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
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

  @Get('all')
  @ApiOkResponse({
    type: ArticleEntity,
    isArray: true,
    description: '文章信息列表',
  })
  async findAll() {
    return (await this.articlesService.findAll()).map((article) => new ArticleEntity(article))
  }

  @Get()
  @ApiQuery({
    name: 'page',
    description: '分页页码',
    required: false,
  })
  @ApiQuery({
    name: 'size',
    description: '分页容量',
    required: false,
  })
  @ApiOkResponse({
    type: Pagination<ArticleEntity>,
    description: '文章信息分页列表',
  })
  async findPage(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number) {
    return new Pagination(
      (await this.articlesService.findPage(page, size)).map((article) => new ArticleEntity(article)),
      page,
      size,
      await this.articlesService.count()
    )
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
