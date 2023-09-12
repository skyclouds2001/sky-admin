import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common'
import { Request, Response } from 'express'
import { Result } from '../common/result.entity'

@Catch()
export class ExceptionsFilter implements ExceptionFilter<unknown> {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    Logger.error(
      `
-----------------------------------------------------------------------
Request original url: ${request.originalUrl}
Method: ${request.method}
IP: ${request.ip}
Code: ${HttpStatus.INTERNAL_SERVER_ERROR}
-----------------------------------------------------------------------
      `
    )

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(Result.fail())
  }
}
