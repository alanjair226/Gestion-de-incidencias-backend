import { Module } from '@nestjs/common';
import { UsercommentsService } from './usercomments.service';
import { UsercommentsController } from './usercomments.controller';
import { Usercomment } from './entities/usercomment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidencesModule } from 'src/incidences/incidences.module';

@Module({
  imports: [
        TypeOrmModule.forFeature([Usercomment]),
      ],
  controllers: [UsercommentsController],
  providers: [UsercommentsService],
  exports: [TypeOrmModule]
})
export class UsercommentsModule {}
