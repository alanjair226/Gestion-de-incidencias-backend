import { PartialType } from '@nestjs/swagger';
import { CreateCommonIncidenceDto } from './create-common_incidence.dto';

import { IsOptional, IsString, MaxLength, IsNumber } from 'class-validator';

export class UpdateCommonIncidenceDto {
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  incidence?: string;

  @IsOptional()
  @IsNumber()
  severity?: number; // ID de la severidad asociada
}
