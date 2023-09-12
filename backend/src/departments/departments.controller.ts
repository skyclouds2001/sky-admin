import { Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpCode, Query, DefaultValuePipe, ParseIntPipe, Put } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { DepartmentsService } from './departments.service'
import { CreateDepartmentDto } from './dto/create-department.dto'
import { UpdateDepartmentDto } from './dto/update-department.dto'
import { DepartmentEntity } from './entities/department.entity'
import { Pagination } from './../common/pagination.entity'

@Controller('departments')
@ApiTags('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: CreateDepartmentDto,
    description: '待添加的部门信息',
  })
  @ApiCreatedResponse({
    type: DepartmentEntity,
    description: '部门信息',
  })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto)
  }

  @Get()
  @ApiOkResponse({
    type: DepartmentEntity,
    isArray: true,
    description: '部门信息列表',
  })
  findAll() {
    return this.departmentsService.findAll()
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
    type: Pagination<DepartmentEntity>,
    description: '部门信息分页列表',
  })
  async findPage(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number) {
    return new Pagination(await this.departmentsService.findPage(page, size), page, size, await this.departmentsService.count())
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '部门ID',
  })
  @ApiOkResponse({
    type: DepartmentEntity,
    description: '部门信息',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.findOne(id)
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: '部门ID',
  })
  @ApiBody({
    type: UpdateDepartmentDto,
    description: '待更新的部门信息',
  })
  @ApiOkResponse({
    type: DepartmentEntity,
    description: '部门信息',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateDepartmentDto)
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '部门ID',
  })
  @ApiOkResponse({
    type: DepartmentEntity,
    description: '部门信息',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.remove(id)
  }
}
