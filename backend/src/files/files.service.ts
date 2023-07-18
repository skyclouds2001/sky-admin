import { Injectable } from '@nestjs/common'

@Injectable()
export class FilesService {
  upload(files: Express.Multer.File[]) {
    console.log(files)
  }
}
