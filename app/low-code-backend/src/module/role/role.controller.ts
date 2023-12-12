import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { RoleService } from './role.service';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get('/')
  findAll(@Query('id') id: string) {
    if (id && !id) {
      throw new HttpException('id不可为空', 400);
    }
    return this.roleService.find(+id);
  }

  @Post('/add')
  addRole(@Body() body) {
    return this.roleService.addRole(body);
  }

  @Put('/updateRole/:id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete('/deleteRole/:id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
