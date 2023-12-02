import { CanvasService } from 'src/module/canvas/canvas.service';
import { Module } from '@nestjs/common';
import { ProjectService } from 'src/module/project/project.service';
import { RoleService } from 'src/module/role/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCanvasProject } from './entities/user_canvas_project.entity';
import { UserCanvasProjectController } from './user_canvas_project.controller';
import { UserCanvasProjectService } from './user_canvas_project.service';
import { UserProjectRoleService } from '../user_project_role/user_project_role.service';
import { UserService } from 'src/module/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserCanvasProject])],
  controllers: [UserCanvasProjectController],
  providers: [
    UserCanvasProjectService,
    UserService,
    ProjectService,
    UserCanvasProjectService,
    UserProjectRoleService,
    RoleService,
    CanvasService,
  ],
  exports: [UserCanvasProjectModule],
})
export class UserCanvasProjectModule {}
