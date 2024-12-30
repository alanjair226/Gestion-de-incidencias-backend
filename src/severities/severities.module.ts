import { Module } from '@nestjs/common';
import { SeveritiesService } from './severities.service';
import { SeveritiesController } from './severities.controller';

@Module({
  controllers: [SeveritiesController],
  providers: [SeveritiesService],
})
export class SeveritiesModule {}
