import { forwardRef, Module } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PeriodsController } from './periods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Period } from './entities/period.entity';
import { UsersModule } from 'src/users/users.module';
import { ScoresModule } from 'src/scores/scores.module';


@Module({
  imports: [
      TypeOrmModule.forFeature([Period]),
      forwardRef(() => UsersModule),
    forwardRef(() => ScoresModule),
    ],
  controllers: [PeriodsController],
  providers: [PeriodsService],
  exports: [TypeOrmModule]
})
export class PeriodsModule {}
