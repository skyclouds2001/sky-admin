import { Controller, Get } from '@nestjs/common'
import { ProjectService } from './project.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ProjectEntity } from './entities/project.entity'

@Controller('project')
@ApiTags('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOkResponse({
    type: ProjectEntity,
    description: '项目信息',
  })
  getProjectInformation() {
    return this.projectService.getProjectInformation()
  }
}
