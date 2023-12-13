import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequireLogin, RequireRole } from 'src/decorators';

@Controller('user')
@RequireLogin()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @RequireRole('项目管理员')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':uid')
  async findOne(@Param('uid') uid: string) {
    return await this.userService.findOne(uid);
  }

  @Put('/updateUser/:uid')
  update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(uid, updateUserDto);
  }

  @Delete('/deleteUser/:uid')
  @RequireRole('项目管理员')
  remove(@Param('uid') uid: string) {
    return this.userService.delete(uid);
  }
}
