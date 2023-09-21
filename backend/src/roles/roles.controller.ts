import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Query, DefaultValuePipe, ParseIntPipe, Put } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RoleEntity } from './entities/role.entity'
import { Pagination } from './../common/pagination.entity'

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: CreateRoleDto,
    description: '待添加的角色信息',
  })
  @ApiCreatedResponse({
    type: RoleEntity,
    description: '角色信息',
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto)
  }

  @Get('all')
  @ApiOkResponse({
    type: RoleEntity,
    isArray: true,
    description: '角色信息列表',
  })
  findAll() {
    return this.rolesService.findAll()
  }

  @Get('')
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
    type: Pagination<RoleEntity>,
    description: '角色信息分页列表',
  })
  async findPage(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number) {
    return new Pagination(await this.rolesService.findPage(page, size), page, size, await this.rolesService.count())
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '角色ID',
  })
  @ApiOkResponse({
    type: RoleEntity,
    description: '角色信息',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOne(id)
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: '角色ID',
  })
  @ApiBody({
    type: UpdateRoleDto,
    description: '待更新的角色信息',
  })
  @ApiOkResponse({
    type: RoleEntity,
    description: '角色信息',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto)
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '角色ID',
  })
  @ApiOkResponse({
    type: RoleEntity,
    description: '角色信息',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id)
  }
}
