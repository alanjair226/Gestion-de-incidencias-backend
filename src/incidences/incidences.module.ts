import { forwardRef, Module } from '@nestjs/common';
import { IncidencesService } from './incidences.service';
import { IncidencesController } from './incidences.controller';
import { Incidence } from './entities/incidence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeveritiesModule } from 'src/severities/severities.module';
import { PeriodsModule } from 'src/periods/periods.module';
import { UsersModule } from 'src/users/users.module';
import { ScoresModule } from 'src/scores/scores.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Incidence]), 
      SeveritiesModule,
      PeriodsModule,
      UsersModule,
      ScoresModule,
    ],
  controllers: [IncidencesController],
  providers: [IncidencesService],
  exports: [TypeOrmModule]
})
export class IncidencesModule {}
