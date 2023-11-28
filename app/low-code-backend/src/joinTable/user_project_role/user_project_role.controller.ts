import { Controller } from '@nestjs/common';
import { UserProjectRoleService } from './user_project_role.service';

@Controller('user-project-role')
export class UserProjectRoleController {
  constructor(
    private readonly userProjectRoleService: UserProjectRoleService,
  ) {}
}
