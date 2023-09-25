import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayGateway } from './gateway.gateway';

@Module({
  providers: [GatewayGateway, GatewayService],
})
export class GatewayModule {}
