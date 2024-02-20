import { CanvasService } from '../canvas/canvas.service';
import { Module } from '@nestjs/common';
import { ProjectService } from '../project/project.service';
import { RoleService } from '../role/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserCanvasProjectService } from 'src/joinTable/user_canvas_project/user_canvas_project.service';
import { UserController } from './user.controller';
import { UserProjectRoleService } from 'src/joinTable/user_project_role/user_project_role.service';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    ProjectService,
    RoleService,
    UserProjectRoleService,
    CanvasService,
    UserCanvasProjectService,
  ],
  exports: [UserModule],
})
export class UserModule {}
