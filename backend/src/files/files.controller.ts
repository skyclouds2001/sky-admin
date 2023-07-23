import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Query, StreamableFile, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOkResponse, ApiFoundResponse, ApiQuery, ApiTags } from '@nestjs/swagger'
import { FilesService } from './files.service'

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  @ApiOkResponse({
    type: null,
    description: '成功上传',
  })
  upload(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/*',
          }),
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024,
          }),
        ],
      })
    )
    files: Express.Multer.File[]
  ) {
    this.filesService.upload(files)
  }

  @Post('download')
  @ApiQuery({
    name: 'path',
    description: '文件路径',
    required: true,
  })
  @ApiFoundResponse({
    type: StreamableFile,
    description: '成功下载',
  })
  async download(@Query('path') path: string) {
    const file = await this.filesService.download(path)
    return new StreamableFile(file)
  }
}
