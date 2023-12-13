import { Module } from '@nestjs/common';
import { PermissionService } from '../permission/permission.service';
import { Role } from './entities/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService, PermissionService],
  exports: [RoleModule, RoleService],
})
export class RoleModule {}
