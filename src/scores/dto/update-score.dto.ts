import { IsOptional, IsNumber } from 'class-validator';

export class UpdateScoreDto {
  @IsOptional()
  @IsNumber()
  user?: number; // ID del usuario asociado

  @IsOptional()
  @IsNumber()
  Period?: number; // ID del periodo asociado

  @IsOptional()
  @IsNumber()
  score?: number; // Puntuación
}
