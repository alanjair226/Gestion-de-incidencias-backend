import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { Period } from './entities/period.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ScoresService } from 'src/scores/scores.service';

@Injectable()
export class PeriodsService {

  constructor(
    @InjectRepository(Period)
    private readonly periodRepository:Repository<Period>,
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private readonly scoresService: ScoresService,
  ){}

  async create(createPeriodDto: CreatePeriodDto) {
    // Verificar si ya existe un período abierto
    const existingOpenPeriod = await this.periodRepository.findOne({
      where: { is_open: true },
    });
  
    if (existingOpenPeriod) {
      throw new BadRequestException('Ya existe un período abierto');
    }
  
    // Crear y guardar el nuevo período
    const newPeriod = this.periodRepository.create(createPeriodDto);
    const savedPeriod = await this.periodRepository.save(newPeriod);
  
    // Obtener todos los usuarios
    const users = await this.userRepository.find();
  
    if (!users || users.length === 0) {
      throw new BadRequestException('No hay usuarios registrados para asignar scores');
    }
  
    // Crear un score para cada usuario
    const scores = users.map((user) => ({
      user: user.id,
      period: savedPeriod.id,
      score: 100, // Score inicial
    }));
  
    // Usar el método existente para crear los scores
    for (const scoreData of scores) {
      await this.scoresService.create(scoreData);
    }
  
    return savedPeriod;
  }
  


  async findAll() {
    return await this.periodRepository.find({order: { start_date: 'DESC' },});
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
