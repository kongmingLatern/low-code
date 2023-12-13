import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProjectRole } from './entities/user_project_role.entity';
import { UserProjectRoleController } from './user_project_role.controller';
import { UserProjectRoleService } from './user_project_role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProjectRole])],
  controllers: [UserProjectRoleController],
  providers: [UserProjectRoleService],
  exports: [UserProjectRoleModule, UserProjectRoleService],
})
export class UserProjectRoleModule {}
