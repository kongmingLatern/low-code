import { Module } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CanvasController } from './canvas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CanvasModule])],
  controllers: [CanvasController],
  providers: [CanvasService],
})
export class CanvasModule {}
