import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthModule } from './module/auth/auth.module';
import { CanvasModule } from './module/canvas/canvas.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginGuard } from './guards/login.guard';
import { Module } from '@nestjs/common';
import { PermissionModule } from './module/permission/permission.module';
import { ProjectModule } from './module/project/project.module';
import { RedisModule } from './module/redis/redis.module';
import { RoleModule } from './module/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCanvasProjectModule } from './joinTable/user_canvas_project/user_canvas_project.module';
import { UserModule } from './module/user/user.module';
import { UserProjectRoleModule } from './joinTable/user_project_role/user_project_role.module';

@Module({
  imports: [
    UserModule,
    ProjectModule,
    CanvasModule,
    RedisModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    UserProjectRoleModule,
    UserCanvasProjectModule,
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
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
