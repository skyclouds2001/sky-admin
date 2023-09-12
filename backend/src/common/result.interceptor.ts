import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { Result } from './result.entity'

@Injectable()
export class TransformResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Result> {
    return next.handle().pipe(map((data) => (context.switchToHttp().getRequest().path !== '/' ? Result.success(data) : data)))
  }
}
