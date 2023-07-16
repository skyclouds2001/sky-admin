import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { Cron, CronExpression } from '@nestjs/schedule'
import { firstValueFrom } from 'rxjs'
import { ProjectEntity } from './entities/project.entity'

@Injectable()
export class ProjectService {
  constructor(private readonly httpService: HttpService) {}

  async getProjectInformation() {
    return (await firstValueFrom(this.httpService.get<ProjectEntity>('https://api.github.com/repos/skyclouds2001/SkyAdmin'))).data
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'project-information',
    timeZone: 'Asia/Shanghai',
  })
  async fetchProjectInformation() {
    console.log((await firstValueFrom(this.httpService.get<ProjectEntity>('https://api.github.com/repos/skyclouds2001/SkyAdmin'))).data)
  }
}
