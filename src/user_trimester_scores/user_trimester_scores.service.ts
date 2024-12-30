import { Injectable } from '@nestjs/common';
import { CreateUserTrimesterScoreDto } from './dto/create-user_trimester_score.dto';
import { UpdateUserTrimesterScoreDto } from './dto/update-user_trimester_score.dto';

@Injectable()
export class UserTrimesterScoresService {
  create(createUserTrimesterScoreDto: CreateUserTrimesterScoreDto) {
    return 'This action adds a new userTrimesterScore';
  }

  findAll() {
    return `This action returns all userTrimesterScores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTrimesterScore`;
  }

  update(id: number, updateUserTrimesterScoreDto: UpdateUserTrimesterScoreDto) {
    return `This action updates a #${id} userTrimesterScore`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTrimesterScore`;
  }
}
