import { Injectable } from '@nestjs/common'

@Injectable()
export class ServerService {
  async getServerInfo() {
    const os = await import('node:os')
    return {
      freemem: os.freemem(),
      hostname: os.hostname(),
      machine: os.machine(),
      release: os.release(),
      totalmem: os.totalmem(),
      type: os.type(),
      uptime: os.uptime(),
      username: os.userInfo().username,
      version: os.version(),
      nodeUptime: process.uptime(),
      nodeVersion: process.version,
    }
  }
}
