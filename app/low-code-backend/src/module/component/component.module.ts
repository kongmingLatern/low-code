import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentController } from './component.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentModule])],
  controllers: [ComponentController],
  providers: [ComponentService],
})
export class ComponentModule {}
