import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttributeModule } from './module/attribute/attribute.module';
import { CanvasModule } from './module/canvas/canvas.module';
import { ComponentModule } from './module/component/component.module';
import { LibraryModule } from './module/library/library.module';
import { Module } from '@nestjs/common';
import { ProjectModule } from './module/project/project.module';
import { RedisModule } from './module/redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { Project } from './module/project/entities/project.entity';
import { Canvas } from './module/canvas/entities/canvas.entity';
import { Library } from './module/library/entities/library.entity';
import { Component } from './module/component/entities/component.entity';
import { Attribute } from './module/attribute/entities/attribute.entity';
import { User } from './module/user/entities/user.entity';
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
      entities: [User, Project, Canvas, Library, Component, Attribute],
      poolSize: 100,
      connectorPackage: 'mysql2',
      // autoLoadEntities: true,
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
