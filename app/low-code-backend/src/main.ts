import { AppModule } from './app.module';
import { GatewayModule } from './module/gateway/gateway.module';
import { NestFactory } from '@nestjs/core';
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
  await app.listen(3333);
}

createWebSocketServer();
createHttpServer();
