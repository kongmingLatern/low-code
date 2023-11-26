import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { CanvasModule } from './module/canvas/canvas.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PermissionModule } from './module/permission/permission.module';
import { ProjectModule } from './module/project/project.module';
import { RedisModule } from './module/redis/redis.module';
import { RoleModule } from './module/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    UserModule,
    ProjectModule,
    CanvasModule,
    RedisModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'syj011023',
      database: 'low-code',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'mowind',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
