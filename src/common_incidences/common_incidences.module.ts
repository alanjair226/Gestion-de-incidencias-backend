import { Module } from '@nestjs/common';
import { CommonIncidencesService } from './common_incidences.service';
import { CommonIncidencesController } from './common_incidences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Severity } from 'src/severities/entities/severity.entity';
import { CommonIncidence } from './entities/common_incidence.entity';
import { SeveritiesModule } from 'src/severities/severities.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([CommonIncidence]),SeveritiesModule
    ],
  controllers: [CommonIncidencesController],
  providers: [CommonIncidencesService],
  exports: [TypeOrmModule]
})
export class CommonIncidencesModule {}
