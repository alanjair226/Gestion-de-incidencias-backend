import { Module } from '@nestjs/common';
import { CommonIncidencesService } from './common_incidences.service';
import { CommonIncidencesController } from './common_incidences.controller';

@Module({
  controllers: [CommonIncidencesController],
  providers: [CommonIncidencesService],
})
export class CommonIncidencesModule {}
