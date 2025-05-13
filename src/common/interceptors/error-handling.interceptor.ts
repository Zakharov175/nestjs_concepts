import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    //remeber: intercptiors can be placed in controller specific call/function or in cotroller geral or in main (for all project)
    // await new Promise(resolve => setTimeout(resolve, 10000));

    return next.handle().pipe(
      catchError((error) => {
        return throwError(() => {
          if (error.name === 'NotFoundException') {
            return new BadRequestException(error.message);
          }

          return new BadRequestException('Error unknow.');
        });
      }),
    );
  }
}
