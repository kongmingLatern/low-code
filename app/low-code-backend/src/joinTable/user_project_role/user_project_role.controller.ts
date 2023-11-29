import { Body, Controller, Put } from '@nestjs/common';
import { UserProjectRoleService } from './user_project_role.service';

@Controller('user-role')
export class UserProjectRoleController {
  constructor(
    private readonly userProjectRoleService: UserProjectRoleService,
  ) {}

  @Put('/change')
  change(@Body() body) {
    return this.userProjectRoleService.changeRole(body);
  }
}
