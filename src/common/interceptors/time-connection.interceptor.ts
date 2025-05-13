import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';
@Injectable()
export class TimeConnectionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTIme = Date.now();
    return next.handle().pipe(
      tap((data) => {
        const finalTIme = Date.now();
        const elapsedTime = finalTIme - startTIme;
        // console.log(
        //   `TimeConnectionInterceptor: take ${elapsedTime}ms for execution`,
        // );
        //console.log(data);
      }),
    );
  }
}
