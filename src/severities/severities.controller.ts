import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeveritiesService } from './severities.service';
import { CreateSeverityDto } from './dto/create-severity.dto';
import { UpdateSeverityDto } from './dto/update-severity.dto';

@Controller('severities')
export class SeveritiesController {
  constructor(private readonly severitiesService: SeveritiesService) {}

  @Post()
  create(@Body() createSeverityDto: CreateSeverityDto) {
    return this.severitiesService.create(createSeverityDto);
  }

  @Get()
  findAll() {
    return this.severitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.severitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeverityDto: UpdateSeverityDto) {
    return this.severitiesService.update(+id, updateSeverityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.severitiesService.remove(+id);
  }
}
