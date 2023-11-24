import { AuthService } from './auth.service';
import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.signIn(user, res);
  }

  @Post('register')
  async signUp(@Body(ValidationPipe) user: RegisterDto) {
    return await this.authService.signUp(user);
  }
}
