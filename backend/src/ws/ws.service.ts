import { Injectable } from '@nestjs/common'

@Injectable()
export class WsService {
  handleMessage(data: string) {
    return data
  }
}
