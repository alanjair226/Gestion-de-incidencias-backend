import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateIncidenceDto } from './dto/create-incidence.dto';
import { UpdateIncidenceDto } from './dto/update-incidence.dto';
import { validate } from 'src/common/utils/validations.utils';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Severity } from 'src/severities/entities/severity.entity';
import { Repository } from 'typeorm';
import { Period } from 'src/periods/entities/period.entity';
import { Incidence } from './entities/incidence.entity';
import { Score } from 'src/scores/entities/score.entity';
import { ScoresService } from 'src/scores/scores.service';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { UpdateIncidenceCommentDto } from './dto/update-incidence-comment.dto';


@Injectable()
export class IncidencesService {

  constructor(
    @InjectRepository(Incidence)
    private readonly incidenceRepository:Repository<Incidence>,
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    @InjectRepository(Severity)
    private readonly severityRepository: Repository<Severity>,
    @InjectRepository(Period)
    private readonly periodRepository: Repository<Period>,
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,

    private readonly scoresService: ScoresService,
  ){}

  

  async create(createIncidenceDto: CreateIncidenceDto, user: UserActiveInterface) {

    const assigned_to = await validate(createIncidenceDto.assigned_to, "id", this.userRepository);
    const created_by = await validate(user.id, "id", this.userRepository);
    const period = await validate(createIncidenceDto.period, "id", this.periodRepository);
    const severity = await validate(createIncidenceDto.severity, "name", this.severityRepository);

    
    let value = createIncidenceDto.value;
    
    if(!createIncidenceDto.value){
      value = severity.value;
    }


    const newIncidence = await this.incidenceRepository.create({
      ...createIncidenceDto,
      assigned_to,
      created_by,
      value,
      severity,
      period,
    })

    const score = await this.scoreRepository.findOneBy({
      user: assigned_to,
      period: period,
    });

    const newScore = score.score - value;

    await this.scoresService.update(score.id, {score: newScore})



    return await this.incidenceRepository.save(newIncidence);
  }
  

  async findAll() {
    return await this.incidenceRepository.find();
  }

  async findOne(id: number) {
    return this.incidenceRepository.findOneBy({id});
  }

  async update(id: number, updateIncidenceDto: UpdateIncidenceDto) {
    const existingIncidence = await this.incidenceRepository.findOneBy({ id });
    if (!existingIncidence) {
      throw new BadRequestException(`Incidence con ID ${id} no encontrada`);
    }
  
    let severity = existingIncidence.severity;
    if (updateIncidenceDto.severity) {
      severity = await validate(updateIncidenceDto.severity, "name", this.severityRepository);
      if (!severity) {
        throw new BadRequestException(`Severity con nombre ${updateIncidenceDto.severity} no encontrada`);
      }
  
      const oldValue = existingIncidence.value;
      existingIncidence.value = severity.value;
  
      const score = await this.scoreRepository.findOneBy({
        user: existingIncidence.assigned_to,
        period: existingIncidence.period,
      });
  
      if (score) {
        score.score += oldValue;
        score.score -= severity.value;
        await this.scoreRepository.save(score);
      }
    }
  
    if (updateIncidenceDto.valid === false && existingIncidence.valid === true) {
      const score = await this.scoreRepository.findOneBy({
        user: existingIncidence.assigned_to,
        period: existingIncidence.period,
      });
  
      if (score) {
        score.score += existingIncidence.value;
        await this.scoreRepository.save(score);
      }
    }
  
    if (updateIncidenceDto.valid === true && existingIncidence.valid === false) {
      const score = await this.scoreRepository.findOneBy({
        user: existingIncidence.assigned_to,
        period: existingIncidence.period,
      });
  
      if (score) {
        score.score -= existingIncidence.value;
        await this.scoreRepository.save(score);
      }
    }

    if (existingIncidence.comment === null && updateIncidenceDto.comment) {
      updateIncidenceDto={
        ...updateIncidenceDto,
        status: true
      };
    }
  
    const updatedIncidence = {
      ...existingIncidence,
      ...updateIncidenceDto,
      severity,
    };

    return await this.incidenceRepository.save(updatedIncidence);
  }

  async updateComment(id: number, updatecommentDto: UpdateIncidenceCommentDto, user : UserActiveInterface) {
    const existingIncidence = await this.incidenceRepository.findOneBy({ id });
    if (!existingIncidence) {
      throw new BadRequestException(`Incidence con ID ${id} no encontrada`);
    }
    const assigned_user = await this.userRepository.findOneBy({ id: user.id });

    if(assigned_user.id != existingIncidence.assigned_to.id){
      throw new UnauthorizedException("you are not authorized to comment this incidence")
    }

    if (existingIncidence.comment === null && updatecommentDto.comment) {
      updatecommentDto={
        ...updatecommentDto,
        status: true
      };
    }
  
    const updatedIncidence = {
      ...existingIncidence,
      ...updatecommentDto,
    };

    return await this.incidenceRepository.save(updatedIncidence);
  }
  
  
  async remove(id: number) {
    return await this.incidenceRepository.delete({id});
  }
}
