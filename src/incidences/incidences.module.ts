import { Module, forwardRef } from '@nestjs/common';
import { IncidencesService } from './incidences.service';
import { IncidencesController } from './incidences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidence } from './entities/incidence.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incidence]),
    forwardRef(() => UsersModule)
  ],
  controllers: [IncidencesController],
  providers: [IncidencesService],
})
export class IncidencesModule {}
