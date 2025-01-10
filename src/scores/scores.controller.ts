import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enum/rol.enum';

@Auth([Role.USER, Role.ADMIN, Role.SUPERADMIN])
@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoresService.create(createScoreDto);
  }

  @Get()
  findAll() {
    return this.scoresService.findAll();
  }

  @Get('/user/:id')
  findScoresByUser(@Param('id') id: number) {
    return this.scoresService.findScoresByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.scoresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoresService.update(id, updateScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.scoresService.remove(id);
  }
}
