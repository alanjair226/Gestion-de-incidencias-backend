import { Injectable } from '@nestjs/common';
import { CreateTrimesterDto } from './dto/create-trimester.dto';
import { UpdateTrimesterDto } from './dto/update-trimester.dto';

@Injectable()
export class TrimestersService {
  create(createTrimesterDto: CreateTrimesterDto) {
    return 'This action adds a new trimester';
  }

  findAll() {
    return `This action returns all trimesters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trimester`;
  }

  update(id: number, updateTrimesterDto: UpdateTrimesterDto) {
    return `This action updates a #${id} trimester`;
  }

  remove(id: number) {
    return `This action removes a #${id} trimester`;
  }
}
