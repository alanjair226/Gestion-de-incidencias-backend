import { PartialType } from '@nestjs/swagger';
import { CreateTrimesterDto } from './create-trimester.dto';

export class UpdateTrimesterDto extends PartialType(CreateTrimesterDto) {}
