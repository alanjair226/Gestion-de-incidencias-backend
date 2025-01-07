import { BadRequestException, Injectable } from '@nestjs/common';
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
import { Usercomment } from 'src/usercomments/entities/usercomment.entity';


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
    @InjectRepository(Usercomment)
    private readonly usercommentRepository: Repository<Usercomment>,
    private readonly scoresService: ScoresService,
  ){}

  

  async create(createIncidenceDto: CreateIncidenceDto) {

    const assigned_to = await validate(createIncidenceDto.assigned_to, "id", this.userRepository);
    const created_by = await validate(createIncidenceDto.assigned_to, "id", this.userRepository);
    const period = await validate(createIncidenceDto.period, "id", this.periodRepository);
    const severity = await validate(createIncidenceDto.severity, "name", this.severityRepository);

    
    let value = createIncidenceDto.value;
    
    if(!createIncidenceDto.value){
      value = severity.value;
    }


    const newIncidence = await this.incidenceRepository.create({
      ...CreateIncidenceDto,
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
  
  return await "hola"
}

  
  
  

  async remove(id: number) {
    return `This action removes a #${id} incidence`;
  }
}
