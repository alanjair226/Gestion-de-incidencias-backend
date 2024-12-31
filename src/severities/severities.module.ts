import { Module } from '@nestjs/common';
import { SeveritiesService } from './severities.service';
import { SeveritiesController } from './severities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Severity } from './entities/severity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Severity])
  ],
  controllers: [SeveritiesController],
  providers: [SeveritiesService],
  exports: [SeveritiesService]
})
export class SeveritiesModule {}
