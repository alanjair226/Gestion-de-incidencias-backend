import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ImageIncidenceService } from './image_incidence.service';
import { CreateImageIncidenceDto } from './dto/create-image_incidence.dto';
import { UpdateImageIncidenceDto } from './dto/update-image_incidence.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enum/rol.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('image-incidence')
export class ImageIncidenceController {
  constructor(private readonly imageIncidenceService: ImageIncidenceService) {}

  @Auth([Role.ADMIN, Role.SUPERADMIN])
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  create(@UploadedFile() file: Express.Multer.File, @Body() createImageIncidenceDto: CreateImageIncidenceDto) {
    return this.imageIncidenceService.create(createImageIncidenceDto, file);
  }

  @Auth([Role.USER])
  @Get()
  findAll() {
    return this.imageIncidenceService.findAll();
  }

  @Auth([Role.USER])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageIncidenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageIncidenceDto: UpdateImageIncidenceDto) {
    //return this.imageIncidenceService.update(+id, updateImageIncidenceDto);
    return {message:"to be developed"}
  }

  @Auth([Role.ADMIN, Role.SUPERADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageIncidenceService.remove(+id);
  }
}
