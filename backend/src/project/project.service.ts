import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { Observable } from 'rxjs'
import { AxiosResponse } from 'axios'
import { Project } from './entities/project.entity'

@Injectable()
export class ProjectService {
  constructor(private readonly httpService: HttpService) {}

  getProjectInformation(): Observable<AxiosResponse<Project>> {
    return this.httpService.get('https://api.github.com/repos/skyclouds2001/SkyAdmin')
  }
}
