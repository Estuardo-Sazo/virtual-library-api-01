import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from '../services/upload.service';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from '../helpers/file-filter-helper';
import { diskStorage } from 'multer';
import { fileNamer } from '../helpers/file-namer-helper';
import { Response } from 'express';
import { JwtGuardGuard } from 'src/auth/guards/jwt-guard.guard';

@Controller('upload')
export class UploadController {
  constructor(
    private configService: ConfigService,
    private readonly uploadService: UploadService,
  ) {}

  @Get('/:type/:imageName')
  findImage(
    @Res() res: Response,
    @Param('type') type: string,
    @Param('imageName') imageName: string,
  ) {
    const path = this.uploadService.getStaticImage(type, imageName);
    res.sendFile(path);
  }

  @UseGuards(JwtGuardGuard)
  @Post('book')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/books',
        filename: fileNamer,
      }),
    }),
  )
  uploadProductFile(@UploadedFile() file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException('Make sire that the file is an image');

    const secureUrl = `${this.configService.get('HOST_API')}upload/books/${file.filename}`;
    return {
      secureUrl,
    };
  }
}
