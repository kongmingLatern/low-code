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
}
