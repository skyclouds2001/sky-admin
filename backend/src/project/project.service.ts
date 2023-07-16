import { Inject, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Cache } from 'cache-manager'
import { firstValueFrom } from 'rxjs'
import { ProjectEntity } from './entities/project.entity'

@Injectable()
export class ProjectService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async getProjectInformation() {
    return (await this.cacheManager.get<ProjectEntity>('project')) ?? (await this.fetchProjectInformation())
  }

  @Cron(CronExpression.EVERY_HOUR, {
    name: 'project-information',
    timeZone: 'Asia/Shanghai',
  })
  async fetchProjectInformation() {
    const { data: projectInfo } = await firstValueFrom(this.httpService.get<ProjectEntity>('https://api.github.com/repos/skyclouds2001/SkyAdmin'))

    await this.cacheManager.set('project', projectInfo)

    return projectInfo
  }
}
