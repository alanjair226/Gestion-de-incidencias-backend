import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateScoreDto {
  @IsNotEmpty()
  @IsNumber()
  user: number; 

  @IsNotEmpty()
  @IsNumber()
  period: number; 

  @IsOptional()
  @IsNumber()
  score: number; 
}
