import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GatewayModule } from './module/gateway/gateway.module';
import { RedisModule } from './module/redis/redis.module';

async function createWebSocketServer() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(3000);
}

async function createHttpServer() {
  const http = await NestFactory.create(AppModule);
  await http.listen(3333);
}

// async function createRedisServer() {
//   await NestFactory.create(RedisModule);
// }

createWebSocketServer();
createHttpServer();
// createRedisServer();
