import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ThrottlerModule } from '@nestjs/throttler';

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  constructor() {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Add rate limit headers
    response.header('X-RateLimit-Limit', '10'); // 10 requests per minute
    response.header('X-RateLimit-Remaining', '9'); // Initial remaining requests
    response.header(
      'X-RateLimit-Reset',
      (Math.ceil(Date.now() / 1000) + 60).toString(), // Reset in 1 minute
    );

    return next.handle();
  }
}
