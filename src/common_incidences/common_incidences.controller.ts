import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommonIncidencesService } from './common_incidences.service';
import { CreateCommonIncidenceDto } from './dto/create-common_incidence.dto';
import { UpdateCommonIncidenceDto } from './dto/update-common_incidence.dto';

@Controller('common-incidences')
export class CommonIncidencesController {
  constructor(private readonly commonIncidencesService: CommonIncidencesService) {}

  @Post()
  create(@Body() createCommonIncidenceDto: CreateCommonIncidenceDto) {
    return this.commonIncidencesService.create(createCommonIncidenceDto);
  }

  @Get()
  findAll() {
    return this.commonIncidencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonIncidencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommonIncidenceDto: UpdateCommonIncidenceDto) {
    return this.commonIncidencesService.update(+id, updateCommonIncidenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonIncidencesService.remove(+id);
  }
}
