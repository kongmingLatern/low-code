import { Module } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CanvasController } from './canvas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Canvas } from './entities/canvas.entity';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Canvas])],
  controllers: [CanvasController],
  providers: [CanvasService, ProjectService, UserService],
})
export class CanvasModule {}
