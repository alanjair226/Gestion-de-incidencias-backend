import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageIncidenceService } from './image_incidence.service';
import { CreateImageIncidenceDto } from './dto/create-image_incidence.dto';
import { UpdateImageIncidenceDto } from './dto/update-image_incidence.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enum/rol.enum';

@Controller('image-incidence')
export class ImageIncidenceController {
  constructor(private readonly imageIncidenceService: ImageIncidenceService) {}

  @Auth([Role.ADMIN, Role.SUPERADMIN])
  @Post()
  create(@Body() createImageIncidenceDto: CreateImageIncidenceDto) {
    return this.imageIncidenceService.create(createImageIncidenceDto);
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
