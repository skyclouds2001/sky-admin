import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import { Request, Response } from 'express'
import { Result } from './result.entity'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    Logger.error(
      `
-----------------------------------------------------------------------
Request original url: ${request.originalUrl}
Method: ${request.method}
IP: ${request.ip}
Code: ${status}
-----------------------------------------------------------------------
      `
    )

    response.status(status).json(Result.fail())
  }
}
