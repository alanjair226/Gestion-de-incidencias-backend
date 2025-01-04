import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsercommentsService } from './usercomments.service';
import { CreateUsercommentDto } from './dto/create-usercomment.dto';
import { UpdateUsercommentDto } from './dto/update-usercomment.dto';

@Controller('usercomments')
export class UsercommentsController {
  constructor(private readonly usercommentsService: UsercommentsService) {}

  @Post()
  create(@Body() createUsercommentDto: CreateUsercommentDto) {
    return this.usercommentsService.create(createUsercommentDto);
  }

  @Get()
  findAll() {
    return this.usercommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usercommentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsercommentDto: UpdateUsercommentDto) {
    return this.usercommentsService.update(+id, updateUsercommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usercommentsService.remove(+id);
  }
}
