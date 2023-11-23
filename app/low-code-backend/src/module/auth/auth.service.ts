import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  signIn(user: LoginDto) {
    console.log('login');
    return user;
  }

  signUp(user: RegisterDto) {
    console.log('register');
    return user;
  }
}
