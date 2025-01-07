import { Injectable } from '@nestjs/common';
import { CreateIncidenceDto } from './dto/create-incidence.dto';
import { UpdateIncidenceDto } from './dto/update-incidence.dto';
import { validate } from 'src/common/utils/validations.utils';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Severity } from 'src/severities/entities/severity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IncidencesService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    @InjectRepository(Severity)
    private readonly severityRepository: Repository<Severity>,
  ){}

  async create(createIncidenceDto: CreateIncidenceDto) {

    const assigned_to = await validate(createIncidenceDto.assigned_to, "id", this.userRepository)
    

    return 'This action adds a new incidence';
  }

  async findAll() {
    return `This action returns all incidences`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} incidence`;
  }

  async update(id: number, updateIncidenceDto: UpdateIncidenceDto) {
    return `This action updates a #${id} incidence`;
  }

  async remove(id: number) {
    return `This action removes a #${id} incidence`;
  }
}
