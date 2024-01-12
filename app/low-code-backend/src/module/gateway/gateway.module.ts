import { CanvasService } from '../canvas/canvas.service';
import { GatewayGateway } from './gateway.gateway';
import { GatewayService } from './gateway.service';
import { Module } from '@nestjs/common';
import { ProjectService } from '../project/project.service';
import { RedisModule } from '../redis/redis.module';
import { RoleService } from '../role/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCanvasProjectService } from 'src/joinTable/user_canvas_project/user_canvas_project.service';
import { UserProjectRoleService } from 'src/joinTable/user_project_role/user_project_role.service';
import { UserService } from '../user/user.service';

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
      autoLoadEntities: true,
    }),
  ],
  providers: [
    GatewayGateway,
    GatewayService,
    ProjectService,
    UserService,
    RoleService,
    UserProjectRoleService,
    UserCanvasProjectService,
    CanvasService,
  ],
})
export class GatewayModule {}
