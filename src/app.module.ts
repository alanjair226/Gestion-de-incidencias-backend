import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ScoresModule } from './scores/scores.module';
import { Score } from './scores/entities/score.entity';
import { User } from './users/entities/user.entity';
import { PeriodsModule } from './periods/periods.module';
import { Period } from './periods/entities/period.entity';
import { SeveritiesModule } from './severities/severities.module';
import { CommonIncidencesModule } from './common_incidences/common_incidences.module';
import { Severity } from './severities/entities/severity.entity';
import { CommonIncidence } from './common_incidences/entities/common_incidence.entity';
import { IncidencesModule } from './incidences/incidences.module';
import { Incidence } from './incidences/entities/incidence.entity';
import { ImageIncidenceModule } from './image_incidence/image_incidence.module';
import { ImageIncidence } from './image_incidence/entities/image_incidence.entity';
import { GoogleDriveService } from './google-drive/google-drive.service';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      timezone: '-06:00',
      entities: [
        User,
        Score,
        Period,
        Severity,
        CommonIncidence,
        Incidence,
        ImageIncidence
      ],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    ScoresModule,
    PeriodsModule,
    SeveritiesModule,
    CommonIncidencesModule,
    IncidencesModule,
    ImageIncidenceModule,
  ],
  controllers: [],
  providers: [GoogleDriveService],
})
export class AppModule {}
