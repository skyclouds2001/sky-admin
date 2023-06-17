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
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(await this.usersService.create(createUserDto))
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(): Promise<UserEntity[]> {
    return (await this.usersService.findAll()).map((user) => new UserEntity(user))
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return new UserEntity(await this.usersService.findOne(id))
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return new UserEntity(await this.usersService.update(id, updateUserDto))
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return new UserEntity(await this.usersService.remove(id))
  }
}
