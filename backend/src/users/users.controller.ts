import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, UseGuards, Query, DefaultValuePipe } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Pagination } from 'src/entities/pagination.entity'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: CreateUserDto,
    description: '待添加的用户信息',
  })
  @ApiCreatedResponse({
    type: UserEntity,
    description: '用户信息',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto))
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
    description: '用户信息列表',
  })
  async findAll() {
    return (await this.usersService.findAll()).map((user) => new UserEntity(user))
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
    type: Pagination<UserEntity>,
    description: '用户信息分页列表',
  })
  async findPage(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number) {
    return new Pagination(
      (await this.usersService.findPage(page, size)).map((user) => new UserEntity(user)),
      page,
      size,
      await this.usersService.count()
    )
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: '用户ID',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: '用户信息',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.findOne(id))
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: '用户ID',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: '待更新的用户信息',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: '用户信息',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(await this.usersService.update(id, updateUserDto))
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: '用户ID',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: '用户信息',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.remove(id))
  }
}
