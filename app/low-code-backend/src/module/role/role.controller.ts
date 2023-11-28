import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';

import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get('/')
  findAll(@Query('id') id: string) {
    console.log('id', id);
    if (id && !id) {
      throw new HttpException('id不可为空', 400);
    }
    return this.roleService.find(+id);
  }

  @Post('/add')
  addRole(@Body() body) {
    return this.roleService.addRole(body);
  }
}
