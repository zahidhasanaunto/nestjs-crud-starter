import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestMethod,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WebRequestInterceptor implements NestInterceptor {
  constructor() {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    if (request.method === 'GET') {
      const query = { ...request.query };
      query.isActive = 'true';
      request.query = query;
    }

    return next.handle();
  }
}
