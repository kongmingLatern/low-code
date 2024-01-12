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
    private projectRepository: EntityManager,
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
    const list: any[] =
      JSON.parse(
        await this.redisService.getRedis(`${body.uid}_list`, 'project'),
      ) || [];

    const project = await this.projectRepository.findOne(Project, {
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
    client.join(`${body.uid}_list`);
    client
      .to(`${body.uid}_list`)
      .emit(
        'message',
        await this.redisService.getRedis(`${body.uid}_list`, 'project'),
      );
  }
}
