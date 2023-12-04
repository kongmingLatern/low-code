import * as md5 from 'md5';

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { UnLoginException } from 'src/filters/unlogin.filter';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger();

  @InjectEntityManager()
  private userRepository: EntityManager;

  @Inject(JwtService)
  private jwtService: JwtService;

  async signIn(user: LoginDto, res: Response) {
    const { username, password } = user;
    const foundUser = await this.userRepository.findOneBy(User, {
      username,
      password: md5(password),
    });
    if (!foundUser) {
      throw new UnLoginException();
    } else {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.uid,
          username: foundUser.username,
        },
      });
      res.setHeader('token', token);
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
