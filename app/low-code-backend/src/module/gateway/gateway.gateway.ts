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
  handleConnectMessage(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('join', body);
    console.log('body', body);
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
      element: JSON.stringify(body.data.element),
      style: JSON.stringify(body.data.style),
    });
    client.broadcast.emit('canvasUpdate', body);
  }
}
