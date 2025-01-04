import { Module, forwardRef } from '@nestjs/common';
import { UserTrimesterScoresService } from './user_trimester_scores.service';
import { UserTrimesterScoresController } from './user_trimester_scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTrimesterScore } from './entities/user_trimester_score.entity';
import { UsersModule } from '../users/users.module';
import { TrimestersModule } from 'src/trimesters/trimesters.module';
import { UsersService } from 'src/users/users.service';
import { TrimestersService } from 'src/trimesters/trimesters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTrimesterScore]),
    UsersModule,
    TrimestersModule
  ],
  controllers: [UserTrimesterScoresController],
  providers: [UserTrimesterScoresService, UsersService, TrimestersService],
  exports: [ UserTrimesterScoresService]
})
export class UserTrimesterScoresModule {}
