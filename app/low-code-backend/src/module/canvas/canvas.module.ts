import { Module } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CanvasController } from './canvas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanvasRepository } from './repository/canvas.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CanvasRepository])],
  controllers: [CanvasController],
  providers: [CanvasService],
})
export class CanvasModule {}
