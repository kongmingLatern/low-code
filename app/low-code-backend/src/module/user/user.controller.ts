import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':uid')
  async findOne(@Param('uid') uid: string) {
    return await this.userService.findOne(uid);
  }

  @Patch(':uid')
  update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(uid, updateUserDto);
  }

  // @Delete(':uid')
  // remove(@Param('uid') uid: string) {
  //   return this.userService.remove(uid);
  // }
}
