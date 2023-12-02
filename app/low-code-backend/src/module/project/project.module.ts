import { CanvasService } from '../canvas/canvas.service';
import { Module } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { RoleService } from '../role/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCanvasProjectService } from 'src/joinTable/user_canvas_project/user_canvas_project.service';
import { UserProjectRoleService } from 'src/joinTable/user_project_role/user_project_role.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    UserService,
    RoleService,
    UserProjectRoleService,
    UserCanvasProjectService,
    CanvasService,
  ],
  exports: [ProjectModule],
})
export class ProjectModule {}
