import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommonIncidenceDto } from './dto/create-common_incidence.dto';
import { UpdateCommonIncidenceDto } from './dto/update-common_incidence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonIncidence } from './entities/common_incidence.entity';
import { Severity } from '../severities/entities/severity.entity';

@Injectable()
export class CommonIncidencesService {

  constructor(
      @InjectRepository(CommonIncidence)
      private readonly commonRepository:Repository<CommonIncidence>,
      @InjectRepository(Severity)
      private readonly severityRepository: Repository<Severity>,
    ){}

    
  async create(createCommonIncidenceDto: CreateCommonIncidenceDto) {
    const severity = await this.severityRepository.findOneBy({name: createCommonIncidenceDto.severity})

    if(!severity){
      throw new BadRequestException("severity not found")
    }

    const incidence = this.commonRepository.create({
      ...createCommonIncidenceDto,
      severity
    });
    return await this.commonRepository.save(incidence);
  }


  async findAll() {
    return await this.commonRepository.find();
  }


  async findOne(id: number) {
    return await this.commonRepository.findOneBy({id})
  }


  async update(id: number, updateCommonIncidenceDto: UpdateCommonIncidenceDto) {
    const existingIncidence = await this.commonRepository.findOneBy({ id });
    if (!existingIncidence) {
      throw new BadRequestException(`CommonIncidence con ID ${id} no encontrada`);
    }
  
    let severity = existingIncidence.severity;
    if (updateCommonIncidenceDto.severity) {
      severity = await this.validateSeverity(updateCommonIncidenceDto.severity);
    }
  
    const updatedIncidence = {
      ...existingIncidence,
      ...updateCommonIncidenceDto,
      severity,
    };
  
    return await this.commonRepository.save(updatedIncidence);
  }


  async remove(id: number) {
    return await this.commonRepository.delete({id});
  }


  private async validateSeverity(severity: string) {
    const severityEntity = await this.severityRepository.findOneBy({ name: severity });
  
    if (!severityEntity) {
      throw new BadRequestException('Breed not found');
    }
  
    return severityEntity;
  }
}
