import { Module } from '@nestjs/common';
import { IncidencesService } from './incidences.service';
import { IncidencesController } from './incidences.controller';

@Module({
  controllers: [IncidencesController],
  providers: [IncidencesService],
})
export class IncidencesModule {}
