import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { createClient } from 'redis';

let isConnected = false;
let reconnectTimer;

async function connectToRedis() {
  const client = createClient({
    socket: {
      host: 'localhost',
      port: 6379,
    },
  });

  client.on('error', (err) => {
    // 当发生错误时，启动定时器以每隔3秒重连
    console.error(`Redis error: ${err.message}`);
    if (!isConnected) {
      reconnectTimer = setTimeout(() => {
        connectToRedis();
      }, 3000);
    }
  });

  await client.connect();

  // 连接成功后，清除定时器并设置连接状态为已连接
  clearTimeout(reconnectTimer);
  isConnected = true;

  return client;
}

@Global()
@Module({
  controllers: [RedisController],
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        return await connectToRedis();
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
