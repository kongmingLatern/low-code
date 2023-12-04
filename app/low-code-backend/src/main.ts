import { AppModule } from './app.module';
import { CustomExceptionFilter } from './filters/custom-exception.filter';
import { FormatResponseInterceptor } from './interceptors/format-response.interceptor';
import { GatewayModule } from './module/gateway/gateway.module';
import { NestFactory } from '@nestjs/core';
import { UnloginFilter } from './filters/unlogin.filter';
import { ValidationPipe } from '@nestjs/common';

async function createWebSocketServer() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(3000);
}

async function createHttpServer() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  app.useGlobalFilters(new UnloginFilter());
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3333);
}

createWebSocketServer();
createHttpServer();
