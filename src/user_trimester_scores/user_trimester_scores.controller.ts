import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTrimesterScoresService } from './user_trimester_scores.service';
import { CreateUserTrimesterScoreDto } from './dto/create-user_trimester_score.dto';
import { UpdateUserTrimesterScoreDto } from './dto/update-user_trimester_score.dto';

@Controller('user-trimester-scores')
export class UserTrimesterScoresController {
  constructor(private readonly userTrimesterScoresService: UserTrimesterScoresService) {}

  @Post()
  create(@Body() createUserTrimesterScoreDto: CreateUserTrimesterScoreDto) {
    return this.userTrimesterScoresService.create(createUserTrimesterScoreDto);
  }

  @Get()
  findAll() {
    return this.userTrimesterScoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTrimesterScoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTrimesterScoreDto: UpdateUserTrimesterScoreDto) {
    return this.userTrimesterScoresService.update(+id, updateUserTrimesterScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTrimesterScoresService.remove(+id);
  }
}
