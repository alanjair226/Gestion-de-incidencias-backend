import { Module } from '@nestjs/common';
import { UserTrimesterScoresService } from './user_trimester_scores.service';
import { UserTrimesterScoresController } from './user_trimester_scores.controller';

@Module({
  controllers: [UserTrimesterScoresController],
  providers: [UserTrimesterScoresService],
})
export class UserTrimesterScoresModule {}
