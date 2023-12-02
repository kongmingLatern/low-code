import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCanvasProject } from './entities/user_canvas_project.entity';
import { UserCanvasProjectController } from './user_canvas_project.controller';
import { UserCanvasProjectService } from './user_canvas_project.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserCanvasProject])],
  controllers: [UserCanvasProjectController],
  providers: [UserCanvasProjectService],
  exports: [UserCanvasProjectModule],
})
export class UserCanvasProjectModule {}
