import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { ServerService } from './server.service'
import { ServerInfo } from './entities/server-info.entity'

@Controller('server')
@ApiTags('server')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Get()
  @ApiOkResponse({
    type: ServerInfo,
    description: '服务器信息',
  })
  async getServerInfo(@Req() request: Request, @Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .json({
        ...(await this.serverService.getServerInfo()),
        ip: request.ip,
      })
      .send()
  }
}
