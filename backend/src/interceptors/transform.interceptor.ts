import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Skip transformation for auth endpoints
    if (request.url.startsWith('/api/auth')) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        if (!data) return data;

        // Handle redirect responses
        if (data.url && data.statusCode) {
          return data;
        }

        // Skip if already in JSON:API format
        if (
          data.data &&
          (Array.isArray(data.data) || typeof data.data === 'object')
        ) {
          return data;
        }

        // Handle arrays
        if (Array.isArray(data)) {
          return {
            data: data.map((item) => this.transformToJsonApi(item)),
          };
        }

        // Handle single items
        return {
          data: this.transformToJsonApi(data),
        };
      }),
    );
  }

  private transformToJsonApi(item: any) {
    if (!item) return item;

    const { id, ...attributes } = item;
    return {
      id,
      type: this.getResourceType(item),
      attributes,
    };
  }

  private getResourceType(item: any): string {
    // Map entity types to JSON:API resource types
    if ('originalUrl' in item) return 'urls';
    if ('email' in item) return 'users';
    return 'unknown';
  }
}
