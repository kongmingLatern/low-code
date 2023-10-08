import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GatewayModule } from './module/gateway/gateway.module';

async function createWebSocketServer() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(3000);
}

async function createHttpServer() {
  const http = await NestFactory.create(AppModule);
  await http.listen(3333);
}

createWebSocketServer();
createHttpServer();
