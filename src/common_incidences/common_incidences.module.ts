import { Module } from '@nestjs/common';
import { CommonIncidencesService } from './common_incidences.service';
import { CommonIncidencesController } from './common_incidences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonIncidence } from './entities/common_incidence.entity';
import { SeveritiesModule } from '../severities/severities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommonIncidence]),
    SeveritiesModule
  ],
  controllers: [CommonIncidencesController],
  providers: [CommonIncidencesService],
})
export class CommonIncidencesModule {}
