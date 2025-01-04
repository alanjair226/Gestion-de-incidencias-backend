import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { UsersModule } from 'src/users/users.module';
import { PeriodsModule } from 'src/periods/periods.module';
import { UsersService } from 'src/users/users.service';
import { PeriodsService } from 'src/periods/periods.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score]), UsersModule, PeriodsModule
  ],
  controllers: [ScoresController],
  providers: [ScoresService, UsersService,PeriodsService],
  exports: [ScoresService]
})
export class ScoresModule {}
