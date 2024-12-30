import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrimestersService } from './trimesters.service';
import { CreateTrimesterDto } from './dto/create-trimester.dto';
import { UpdateTrimesterDto } from './dto/update-trimester.dto';

@Controller('trimesters')
export class TrimestersController {
  constructor(private readonly trimestersService: TrimestersService) {}

  @Post()
  create(@Body() createTrimesterDto: CreateTrimesterDto) {
    return this.trimestersService.create(createTrimesterDto);
  }

  @Get()
  findAll() {
    return this.trimestersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trimestersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrimesterDto: UpdateTrimesterDto) {
    return this.trimestersService.update(+id, updateTrimesterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trimestersService.remove(+id);
  }
}
