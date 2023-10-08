import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { GatewayService } from './gateway.service';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GatewayGateway {
  constructor(private readonly gatewayService: GatewayService) {}

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
}
