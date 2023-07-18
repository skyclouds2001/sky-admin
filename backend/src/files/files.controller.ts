import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Query, StreamableFile, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service'

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
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
  async download(@Query('path') path: string) {
    const file = await this.filesService.download(path)
    return new StreamableFile(file)
  }
}
