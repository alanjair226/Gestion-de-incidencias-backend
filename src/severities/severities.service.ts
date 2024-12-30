import { Injectable } from '@nestjs/common';
import { CreateSeverityDto } from './dto/create-severity.dto';
import { UpdateSeverityDto } from './dto/update-severity.dto';

@Injectable()
export class SeveritiesService {
  create(createSeverityDto: CreateSeverityDto) {
    return 'This action adds a new severity';
  }

  findAll() {
    return `This action returns all severities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} severity`;
  }

  update(id: number, updateSeverityDto: UpdateSeverityDto) {
    return `This action updates a #${id} severity`;
  }

  remove(id: number) {
    return `This action removes a #${id} severity`;
  }
}
