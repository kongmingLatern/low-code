import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RoleService } from 'src/module/role/role.service';
import { UserProjectRoleService } from 'src/joinTable/user_project_role/user_project_role.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(UserProjectRoleService)
  private userProjectRoleService: UserProjectRoleService;

  @Inject(RoleService)
  private roleService: RoleService;

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const requireRole =
      this.reflector.getAllAndOverride<string[]>('require-role', [
        context.getClass(),
        context.getHandler(),
      ]) ?? '普通';

    if (requireRole === '普通') {
      return true;
    }

    console.log('requireRole', requireRole);

    const { id } = (request as any).user;
    // NOTE: role_id: 项目管理员的id;
    const role_id = (
      (await this.userProjectRoleService.findByOptions({
        methods: 'one',
        uid: id,
      })) as any
    ).role_id;

    // NOTE: name: 项目管理员;
    const { name } = await (this.roleService.find(role_id) as any);

    return requireRole && requireRole?.includes(name);
  }
}
