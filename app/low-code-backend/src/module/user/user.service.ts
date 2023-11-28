import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private userRepository: EntityManager;

  async createUser(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      uid: v4(),
    };
    return await this.userRepository.save(User, user);
  }

  async findAll() {
    return await this.userRepository.find(User);
  }

  async findOne(uid: string) {
    const found = await this.userRepository.findOne(User, {
      where: { uid },
    });
    if (!found) {
      throw new NotFoundException(`User with uid ${uid} is not found!`);
    }
    return found;
  }

  async update(uid: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(User, uid, updateUserDto);
  }

  async delete(uid: string) {
    return await this.userRepository.delete(User, uid);
  }
}
