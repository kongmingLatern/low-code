import { Test, TestingModule } from '@nestjs/testing';
import { GatewayGateway } from './gateway.gateway';
import { GatewayService } from './gateway.service';

describe('GatewayGateway', () => {
  let gateway: GatewayGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatewayGateway, GatewayService],
    }).compile();

    gateway = module.get<GatewayGateway>(GatewayGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
