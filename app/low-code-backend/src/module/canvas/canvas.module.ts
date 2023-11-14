import { Module } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CanvasController } from './canvas.controller';

@Module({
  controllers: [CanvasController],
  providers: [CanvasService]
})
export class CanvasModule {}
