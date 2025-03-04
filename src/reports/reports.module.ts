import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidence } from 'src/incidences/entities/incidence.entity';
import { Period } from 'src/periods/entities/period.entity';
import { Score } from 'src/scores/entities/score.entity';
import { User } from 'src/users/entities/user.entity';
import { Severity } from 'src/severities/entities/severity.entity';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Incidence, Period, Score, User, Severity])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
