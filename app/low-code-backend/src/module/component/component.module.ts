import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentController } from './component.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentRepository } from './repository/component.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentRepository])],
  controllers: [ComponentController],
  providers: [ComponentService],
})
export class ComponentModule {}
