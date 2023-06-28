import { ArgumentsHost, Catch } from '@nestjs/common'
import { BaseWsExceptionFilter } from '@nestjs/websockets'

@Catch()
export class WsExceptionFilter<T> extends BaseWsExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    super.catch(exception, host)
  }
}
