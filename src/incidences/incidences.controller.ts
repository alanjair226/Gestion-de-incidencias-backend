import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncidencesService } from './incidences.service';
import { CreateIncidenceDto } from './dto/create-incidence.dto';
import { UpdateIncidenceDto } from './dto/update-incidence.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enum/rol.enum';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ActiveUser } from 'src/common/decorators/active-user.decorators';
import { UpdateIncidenceCommentDto } from './dto/update-incidence-comment.dto';

@Controller('incidences')
export class IncidencesController {
  constructor(private readonly incidencesService: IncidencesService) {}

  @Auth([Role.ADMIN, Role.SUPERADMIN])
  @Post()
  create(@Body() createIncidenceDto: CreateIncidenceDto, @ActiveUser() user: UserActiveInterface) {
    return this.incidencesService.create(createIncidenceDto, user);
  }

  @Auth([Role.ADMIN, Role.USER, Role.SUPERADMIN])
  @Get()
  findAll() {
    return this.incidencesService.findAll();
  }

  @Auth([Role.ADMIN, Role.USER, Role.SUPERADMIN])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incidencesService.findOne(+id);
  }

  @Auth([Role.ADMIN, Role.SUPERADMIN])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncidenceDto: UpdateIncidenceDto) {
    return this.incidencesService.update(+id, updateIncidenceDto);
  }

  @Auth([Role.ADMIN, Role.USER, Role.SUPERADMIN])
  @Patch('/comment/:id')
  updateComment(@Param('id') id: string, @Body() updateIncidenceCommentDto: UpdateIncidenceCommentDto, @ActiveUser() user: UserActiveInterface) {
    return this.incidencesService.updateComment(+id, updateIncidenceCommentDto, user);
  }

  @Auth([Role.ADMIN, Role.SUPERADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incidencesService.remove(+id);
  }
}
