import { type ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { type Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
    console.error(exception.message)

    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const message = exception.message.replace(/\n/g, '')

    switch (exception.code) {
      case 'P2002':
        response.status(HttpStatus.CONFLICT).json({
          code: HttpStatus.CONFLICT,
          message,
        })
        break
      case 'P2025':
        response.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message,
        })
        break
      default:
        // eslint-disable-next-line promise/valid-params
        super.catch(exception, host)
        break
    }
  }
}
