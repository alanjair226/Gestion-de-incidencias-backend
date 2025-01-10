import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enum/rol.enum';


@Auth([Role.ADMIN, Role.SUPERADMIN])
@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Post()
  create(@Body() createPeriodDto: CreatePeriodDto) {
    return this.periodsService.create(createPeriodDto);
  }

  @Auth([Role.USER, Role.ADMIN, Role.SUPERADMIN])
  @Get()
  findAll() {
    return this.periodsService.findAll();
  }

  @Auth([Role.USER, Role.ADMIN, Role.SUPERADMIN])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodsService.findOne(+id);
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeriodDto: UpdatePeriodDto) {
    return this.periodsService.update(+id, updatePeriodDto);
  }

}
