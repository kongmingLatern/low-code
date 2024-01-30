import { ComponentConfig } from './entities/component_config.entity';
import { ComponentConfigController } from './component_config.controller';
import { ComponentConfigService } from './component_config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentConfig])],
  controllers: [ComponentConfigController],
  providers: [ComponentConfigService],
})
export class ComponentConfigModule {}
