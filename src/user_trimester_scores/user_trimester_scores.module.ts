import { Module, forwardRef } from '@nestjs/common';
import { UserTrimesterScoresService } from './user_trimester_scores.service';
import { UserTrimesterScoresController } from './user_trimester_scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTrimesterScore } from './entities/user_trimester_score.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTrimesterScore]),
    forwardRef(() => UsersModule)
  ],
  controllers: [UserTrimesterScoresController],
  providers: [UserTrimesterScoresService],
})
export class UserTrimesterScoresModule {}
