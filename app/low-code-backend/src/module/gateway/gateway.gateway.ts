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
  ) {}

  @SubscribeMessage('onJoin')
  async handleConnectMessage(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    // TODO: 获取画布id
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
    // NOTE: 这里会广播给其他的客户端
    client.to(`canvas_${body.canvasId}`).emit('active', body);
    // client.broadcast.emit('active', body);
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
    // client.broadcast.emit('canvasUpdate', body);
    client.to(`canvas_${data.canvasId}`).emit('canvasUpdate', body);
  }
}
