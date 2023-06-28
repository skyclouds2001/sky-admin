import { UseFilters } from '@nestjs/common'
import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets'
import { WsService } from './ws.service'
import { WsExceptionFilter } from './ws-exception.filter'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(new WsExceptionFilter())
export class WsGateway {
  constructor(private readonly wsService: WsService) {}

  @SubscribeMessage('ping')
  handleMessage(@MessageBody() data: string): WsResponse<string> {
    return {
      event: 'pong',
      data: this.wsService.handleMessage(data),
    }
  }
}
