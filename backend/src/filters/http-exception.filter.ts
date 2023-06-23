import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import { Request, Response } from 'express'

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
      `.trim()
    )

    response.status(status).json({
      success: false,
      code: -1,
      message: 'FAIL',
      data: null,
    })
  }
}
