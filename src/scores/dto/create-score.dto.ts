import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateScoreDto {
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  user: number; 

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  period: number; 

  @IsOptional()
  @IsNumber()
  score: number; 
}
