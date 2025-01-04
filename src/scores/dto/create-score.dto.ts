import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateScoreDto {
  @IsNotEmpty()
  @IsNumber()
  user: number; // ID del usuario asociado

  @IsNotEmpty()
  @IsNumber()
  Period: number; // ID del periodo asociado

  @IsNotEmpty()
  @IsNumber()
  score: number; // Puntuación
}
