import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors();

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  // Apply JSON:API transform interceptor globally
  app.useGlobalInterceptors(new TransformInterceptor());

  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3001);

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
