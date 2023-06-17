import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ArticlesService } from './articles.service'
import { type CreateArticleDto } from './dto/create-article.dto'
import { type UpdateArticleDto } from './dto/update-article.dto'

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto)
  }

  @Get()
  findAll() {
    return this.articlesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id)
  }
}
