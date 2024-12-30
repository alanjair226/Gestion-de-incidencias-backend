import { PartialType } from '@nestjs/swagger';
import { CreateUserTrimesterScoreDto } from './create-user_trimester_score.dto';

export class UpdateUserTrimesterScoreDto extends PartialType(CreateUserTrimesterScoreDto) {}
