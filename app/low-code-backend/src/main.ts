import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GatewayModule } from './module/gateway/gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const http = await NestFactory.create(AppModule);
  await app.listen(3000);
  await http.listen(3333);
}
bootstrap();
