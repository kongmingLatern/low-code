import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { GatewayService } from './gateway.service';
import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

import { Project } from '../project/entities/project.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserProjectRole } from 'src/joinTable/user_project_role/entities/user_project_role.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class GatewayGateway {
  constructor(
    private readonly gatewayService: GatewayService,
    private readonly redisService: RedisService,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @SubscribeMessage('onJoin')
  async handleConnectMessage(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    const { canvasId } = body;
    const { data } = await this.redisService.getCanvas(canvasId);
    client.join(`canvas_${canvasId}`);
    client.emit('join', data);
  }

  @SubscribeMessage('onLeave')
  async handleLeave(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`canvas_${body.canvasId}`);
    client.to(`canvas_${body.canvasId}`).emit('leave', body);
  }

  @SubscribeMessage('onActive')
  handleEditElement(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    // NOTE: 这里会广播给其他进入当前画布的客户端
    client.to(`canvas_${body.canvasId}`).emit('active', body);
  }

  @SubscribeMessage('onCanvasUpdate')
  async handleCanvasUpdate(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    const { data } = body;
    // 设置信息
    this.redisService.setCanvas({
      canvasId: data.canvasId,
      element: data.element,
      style: data.style,
    });
    // 更新当前画布信息至所有进入该画布的用户
    client.to(`canvas_${data.canvasId}`).emit('canvasUpdate', body);
  }

  @SubscribeMessage('onInvite')
  async handleJoinProject(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    const found = await this.entityManager.findOne(UserProjectRole, {
      where: {
        uid: body.uid,
        project_id: body.project_id,
      },
    });
    if (found) {
      // 如果找到,说明该用户已加入本项目
      client
        .to(`${body.createBy}_list`)
        .emit('error', '该用户已经加入该项目,无法再次邀请');
      return;
    }
    const list: any[] =
      JSON.parse(
        await this.redisService.getRedis(`${body.uid}_list`, 'project'),
      ) || [];

    const project = await this.entityManager.findOne(Project, {
      where: {
        project_id: body.project_id,
      },
    });
    if (
      list.some((i) => project.project_id !== i.project_id) ||
      list.length === 0
    ) {
      list.push(project);
      await this.redisService.setRedis(
        `${body.uid}_list`,
        'project',
        JSON.stringify(list),
      );
    }
    client.to(`${body.uid}_list`).emit('message', list);
  }

  @SubscribeMessage('onLine')
  async handleMessage(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`${body.uid}_list`);
    client.join(`${body.uid}_list`);
    client
      .to(`${body.uid}_list`)
      .emit(
        'search',
        await this.redisService.getRedis(`${body.uid}_list`, 'project'),
      );
  }

  @SubscribeMessage('onAgree')
  async handleAgreeProject(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    const list: any[] =
      JSON.parse(
        await this.redisService.getRedis(`${body.uid}_list`, 'project'),
      ) || [];
    const res = list.filter((i) => i.project_id !== body.project_id);
    await this.redisService.setRedis(
      `${body.uid}_list`,
      'project',
      JSON.stringify(res),
    );
    client.to(`${body.createBy}_list`).emit('agreeProject', {
      nickname: (
        await this.entityManager.findOne(User, {
          select: {
            nickname: true,
          },
          where: {
            uid: body.uid,
          },
        })
      ).nickname,
      project_name: (
        await this.entityManager.findOne(Project, {
          select: {
            project_name: true,
          },
          where: {
            project_id: body.project_id,
          },
        })
      ).project_name,
    });
  }

  @SubscribeMessage('onReuse')
  async handleReuseProject(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    const list: any[] =
      JSON.parse(
        await this.redisService.getRedis(`${body.uid}_list`, 'project'),
      ) || [];
    const res = list.filter((i) => i.project_id !== body.project_id);
    console.log('reuse', res);
    await this.redisService.setRedis(
      `${body.uid}_list`,
      'project',
      JSON.stringify(res),
    );
    client.to(`${body.createBy}_list`).emit('reuseProject', {
      nickname: (
        await this.entityManager.findOne(User, {
          select: {
            nickname: true,
          },
          where: {
            uid: body.uid,
          },
        })
      ).nickname,
      project_name: (
        await this.entityManager.findOne(Project, {
          select: {
            project_name: true,
          },
          where: {
            project_id: body.project_id,
          },
        })
      ).project_name,
    });
  }
}
