import { Injectable } from '@nestjs/common';
import { CreateSeverityDto } from './dto/create-severity.dto';
import { UpdateSeverityDto } from './dto/update-severity.dto';
import { Severity } from './entities/severity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeveritiesService {

  constructor(
    @InjectRepository(Severity)
      private readonly severityRepository:Repository<Severity>,
  ){}

  async create(createSeverityDto: CreateSeverityDto) {
    const severity = this.severityRepository.create(createSeverityDto)
    return await this.severityRepository.save(severity)
  }

  async findAll() {
    return await this.severityRepository.find()
  }

  async findOne(id: number) {
    return await this.severityRepository.findOneBy({id})
  }

  async update(id: number, updateSeverityDto: UpdateSeverityDto) {
    return await this.severityRepository.update(id, updateSeverityDto);
  }

  async remove(id: number) {
    return await this.severityRepository.delete({id});
  }
  
}
