import { Injectable } from '@nestjs/common'

@Injectable()
export class FilesService {
  upload(files: Express.Multer.File[]) {
    console.log(files)
  }

  async download(src: string) {
    const path = await import('node:path')
    const fs = await import('node:fs')
    return fs.createReadStream(path.resolve(process.cwd(), src))
  }
}
