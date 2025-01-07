import { Module } from '@nestjs/common';
import { IncidencesService } from './incidences.service';
import { IncidencesController } from './incidences.controller';
import { Incidence } from './entities/incidence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeveritiesModule } from 'src/severities/severities.module';
import { Period } from 'src/periods/entities/period.entity';
import { UsercommentsModule } from 'src/usercomments/usercomments.module';
import { User } from 'src/users/entities/user.entity';
import { PeriodsModule } from 'src/periods/periods.module';
import { UsersModule } from 'src/users/users.module';
import { ScoresModule } from 'src/scores/scores.module';
import { ScoresService } from 'src/scores/scores.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([Incidence]), 
      SeveritiesModule,
      PeriodsModule,
      UsersModule,
      ScoresModule,
      UsercommentsModule
    ],
  controllers: [IncidencesController],
  providers: [IncidencesService],
  exports: [TypeOrmModule]
})
export class IncidencesModule {}
