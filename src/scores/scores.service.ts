import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { Score } from './entities/score.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Period } from 'src/periods/entities/period.entity';
import { validate } from '../common/utils/validations.utils';

@Injectable()
export class ScoresService {

  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Period)
    private readonly periodRepository: Repository<Period>
  ){}

  async create(createScoreDto: CreateScoreDto) {
    const user = await validate(createScoreDto.user, "id", this.userRepository);
    const period = await validate(createScoreDto.period, "id", this.periodRepository);

    const newScore = this.scoreRepository.create({
      ...createScoreDto, 
      user, 
      period
    });
    return await this.scoreRepository.save(newScore);
  }

  async findAll() {
    return await this.scoreRepository.find()
  }

  async findOne(id: number) {
    return await this.scoreRepository.findOneBy({id})
  }

  async update(id: number, updateScoreDto: UpdateScoreDto) {
    const existingScore = await this.scoreRepository.findOneBy({ id });
    if (!existingScore) {
      throw new BadRequestException(`Score con ID ${id} no encontrado`);
    }
  
    let user = existingScore.user;
    let period = existingScore.period;
  
    if (updateScoreDto.user) {
      user = await validate(updateScoreDto.user, "id", this.userRepository);
    }
  
    if (updateScoreDto.period) {
      period = await validate(updateScoreDto.period, "id", this.periodRepository);
    }
    const updatedScore = {
      ...existingScore,
      ...updateScoreDto,
      user,
      period,
    };

    return await this.scoreRepository.save(updatedScore);
  }
  

  async remove(id: number) {
    return this.scoreRepository.delete({id})
  }


}
