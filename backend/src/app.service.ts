import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  view() {
    return {
      message: 'Hello Guys',
    }
  }
}
