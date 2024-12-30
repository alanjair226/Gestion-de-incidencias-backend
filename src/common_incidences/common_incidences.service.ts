import { Injectable } from '@nestjs/common';
import { CreateCommonIncidenceDto } from './dto/create-common_incidence.dto';
import { UpdateCommonIncidenceDto } from './dto/update-common_incidence.dto';

@Injectable()
export class CommonIncidencesService {
  create(createCommonIncidenceDto: CreateCommonIncidenceDto) {
    return 'This action adds a new commonIncidence';
  }

  findAll() {
    return `This action returns all commonIncidences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commonIncidence`;
  }

  update(id: number, updateCommonIncidenceDto: UpdateCommonIncidenceDto) {
    return `This action updates a #${id} commonIncidence`;
  }

  remove(id: number) {
    return `This action removes a #${id} commonIncidence`;
  }
}
