import { Module } from '@nestjs/common';
import { ImageIncidenceService } from './image_incidence.service';
import { ImageIncidenceController } from './image_incidence.controller';
import { IncidencesModule } from 'src/incidences/incidences.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageIncidence } from './entities/image_incidence.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageIncidence]), 
    IncidencesModule,
  ],
  controllers: [ImageIncidenceController],
  providers: [ImageIncidenceService, GoogleDriveService],
  exports: [TypeOrmModule, GoogleDriveService]
})
export class ImageIncidenceModule {}
