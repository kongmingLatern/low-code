import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayGateway } from './gateway.gateway';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [GatewayGateway, GatewayService],
})
export class GatewayModule {}
