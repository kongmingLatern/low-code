import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() user: LoginDto) {
    return await this.authService.signIn(user);
  }

  @Post('register')
  async signUp(@Body() user: RegisterDto) {
    return await this.authService.signUp(user);
  }
}
