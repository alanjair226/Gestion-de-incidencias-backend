import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { IncidencesModule } from './incidences/incidences.module';
import { CommonIncidencesModule } from './common_incidences/common_incidences.module';
import { SeveritiesModule } from './severities/severities.module';
import { TrimestersModule } from './trimesters/trimesters.module';
import { CommentsModule } from './comments/comments.module';
import { UserTrimesterScoresModule } from './user_trimester_scores/user_trimester_scores.module';
import { User } from './users/entities/user.entity';
import { Incidence } from './incidences/entities/incidence.entity';
import { CommonIncidence } from './common_incidences/entities/common_incidence.entity';
import { Trimester } from './trimesters/entities/trimester.entity';
import { Severity } from './severities/entities/severity.entity';
import { UserTrimesterScore } from './user_trimester_scores/entities/user_trimester_score.entity';
import { Comment } from './comments/entities/comment.entity';
require('dotenv').config();

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      logger: 'advanced-console',
    logging: 'all',
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [
        User,
        Trimester,
        UserTrimesterScore,
        //Comment,
        //CommonIncidence,
        //Severity,
        //Incidence,
      ],
      synchronize: true,
    }),
    AuthModule,
    IncidencesModule,
    CommonIncidencesModule,
    SeveritiesModule,
    TrimestersModule,
    CommentsModule,
    UserTrimesterScoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
