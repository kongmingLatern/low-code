import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as md5 from 'md5';

@Injectable()
export class AuthService {
  @InjectEntityManager()
  private userRepository: EntityManager;
  private logger = new Logger();

  async signIn(user: LoginDto) {
    const { username, password } = user;
    const foundUser = await this.userRepository.findOneBy(User, {
      username,
      password: md5(password),
    });
    if (!foundUser) {
      throw new HttpException('登陆失败', HttpStatus.OK);
    } else {
      return '登陆成功';
    }
  }

  async signUp(user: RegisterDto) {
    const { username, password } = user;
    const foundUser = await this.userRepository.findOneBy(User, { username });
    if (foundUser) {
      throw new HttpException('该用户名已经存在,请重新输入', HttpStatus.OK);
    }
    const newUser = new User();
    newUser.username = username;
    newUser.password = md5(password);
    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, AuthService);
      throw new HttpException('注册失败', HttpStatus.BAD_REQUEST);
    }
  }
}
