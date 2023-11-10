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
    const { canvasId } = body
    const { data } = await this.redisService.getCanvas(canvasId);
    client.emit('join', data);
  }

  @SubscribeMessage('onActive')
  handleEditElement(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    // 这里会广播给其他的客户端
    client.broadcast.emit('active', body);
    console.log('body', body);
  }
  @SubscribeMessage('onCanvasUpdate')
  async handleCanvasUpdate(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    // 设置信息
    this.redisService.setCanvas({
      element: body.data.element,
      style: body.data.style,
    });
    client.broadcast.emit('canvasUpdate', body);
  }
}
