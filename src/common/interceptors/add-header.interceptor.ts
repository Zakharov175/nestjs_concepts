import { CallHandler, ExecutionContext, NestInterceptor, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('addHeaderInterceptor execution');
    const response = context.switchToHttp().getResponse();
    response.setHeader('X-Custom-header', 'The value');
    return next.handle();
  }
}
