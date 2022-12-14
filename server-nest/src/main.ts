import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:4200', 'http://localhost:3000'],
  });

  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
