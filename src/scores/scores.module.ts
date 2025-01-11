import { forwardRef, Module } from '@nestjs/common';
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
    TypeOrmModule.forFeature([Score]), 
    forwardRef(() => UsersModule), 
    forwardRef(() => PeriodsModule)
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
  exports: [TypeOrmModule, ScoresService]
})
export class ScoresModule {}
