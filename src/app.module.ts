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
require('dotenv').config();

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
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
