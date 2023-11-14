import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './module/redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { CanvasModule } from './canvas/canvas.module';
import { LibraryModule } from './library/library.module';
import { ComponentModule } from './component/component.module';
import { AttributeModule } from './attribute/attribute.module';

@Module({
  imports: [
    RedisModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'syj011023',
      database: 'low-code',
      synchronize: true,
      logging: true,
      entities: [],
      poolSize: 100,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    UserModule,
    ProjectModule,
    CanvasModule,
    LibraryModule,
    ComponentModule,
    AttributeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
