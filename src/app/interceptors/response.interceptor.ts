import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessResponse } from '../types';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((content: any) => {
        if (!content) {
          return new SuccessResponse('Successful empty response', null);
        }

        if (content instanceof SuccessResponse) {
          if (
            content.data &&
            Array.isArray(content.data) &&
            content.data.length === 2 &&
            typeof content.data[1] === 'number'
          ) {
            content.data = content.data[0];
          }
          return content;
        } else if (
          typeof content === 'object' &&
          content.hasOwnProperty('success') &&
          content.hasOwnProperty('statusCode')
        ) {
          return content;
        } else if (typeof content === 'object') {
          return new SuccessResponse('Successful response', content);
        } else {
          throw new HttpException(
            'Something went wrong',
            HttpStatus.BAD_REQUEST
          );
        }
      })
    );
  }
}
