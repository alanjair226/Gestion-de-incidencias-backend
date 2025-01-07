import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { Period } from './entities/period.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PeriodsService {

  constructor(
    @InjectRepository(Period)
    private readonly periodRepository:Repository<Period>
  ){}

  async create(createPeriodDto: CreatePeriodDto){
    
    const existingOpenPeriod = await this.periodRepository.findOne({
      where: { is_open: true },
    });

    if (existingOpenPeriod) {
      throw new ConflictException('an open period already exists');
    }

    const newPeriod = this.periodRepository.create(createPeriodDto);
    return await this.periodRepository.save(newPeriod);
  }


  async findAll() {
    return await this.periodRepository.find();
  }

  async findOne(id: number) {
    return this.periodRepository.findOneBy({id})
  }

  async update(id: number, updatePeriodDto: UpdatePeriodDto) {
    if (updatePeriodDto.is_open) {
      const existingOpenPeriod = await this.periodRepository.findOne({
        where: { is_open: true },
      });
  
      if (existingOpenPeriod) {
        throw new ConflictException('Ya existe otro periodo abierto.');
      }
    }
  
    return await this.periodRepository.update(id, updatePeriodDto);
  }
}
