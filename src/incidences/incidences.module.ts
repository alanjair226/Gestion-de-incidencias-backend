import { Module } from '@nestjs/common';
import { IncidencesService } from './incidences.service';
import { IncidencesController } from './incidences.controller';
import { Incidence } from './entities/incidence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeveritiesModule } from 'src/severities/severities.module';
import { Period } from 'src/periods/entities/period.entity';
import { UsercommentsModule } from 'src/usercomments/usercomments.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Incidence]), 
      SeveritiesModule,
      Period,
    ],
  controllers: [IncidencesController],
  providers: [IncidencesService],
  exports: [TypeOrmModule]
})
export class IncidencesModule {}
