import { AppModule } from './app.module';
import { GatewayModule } from './module/gateway/gateway.module';
import { NestFactory } from '@nestjs/core';

async function createWebSocketServer() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(3000);
}

async function createHttpServer() {
  const http = await NestFactory.create(AppModule);
  http.enableCors({
    origin: true,
  });
  await http.listen(3333);
}

createWebSocketServer();
createHttpServer();
