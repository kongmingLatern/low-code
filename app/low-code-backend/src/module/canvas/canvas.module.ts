import { Canvas } from './entities/canvas.entity';
import { CanvasController } from './canvas.controller';
import { CanvasService } from './canvas.service';
import { Module } from '@nestjs/common';
import { ProjectService } from '../project/project.service';
import { RoleService } from '../role/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCanvasProjectService } from 'src/joinTable/user_canvas_project/user_canvas_project.service';
import { UserProjectRoleService } from 'src/joinTable/user_project_role/user_project_role.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Canvas])],
  controllers: [CanvasController],
  providers: [
    CanvasService,
    ProjectService,
    UserService,
    RoleService,
    UserProjectRoleService,
    UserCanvasProjectService,
  ],
})
export class CanvasModule {}
