import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @Length(6, 30, { message: '请输入长度为6-30的用户名' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 30, { message: '请输入6-30位密码' })
  password: string;

  @IsString()
  nickname: string;
}
