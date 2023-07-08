import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { Project } from './entities/project.entity'

@Injectable()
export class ProjectService {
  constructor(private readonly httpService: HttpService) {}

  async getProjectInformation() {
    return (await firstValueFrom(this.httpService.get<Project>('https://api.github.com/repos/skyclouds2001/SkyAdmin'))).data
  }
}
