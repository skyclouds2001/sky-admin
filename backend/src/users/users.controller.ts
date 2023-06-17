import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { UsersService } from './users.service'
import { type CreateUserDto } from './dto/create-user.dto'
import { type UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.usersService.remove(id)
  }
}
