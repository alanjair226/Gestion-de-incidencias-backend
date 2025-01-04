import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIncidenceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  assigned_to: number;

  @IsNotEmpty()
  @IsNumber()
  created_by: number;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsNumber()
  severity: number;

  @IsNotEmpty()
  @IsNumber()
  period: number;

  @IsNotEmpty()
  @IsDateString()
  created_at: Date;

  @IsOptional()
  @IsNumber()
  comment?: number;
}
