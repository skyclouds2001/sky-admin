import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { Result } from 'src/entities/result.entity'

@Injectable()
export class TransformResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Result> {
    return next.handle().pipe(map((data) => Result.success(data)))
  }
}