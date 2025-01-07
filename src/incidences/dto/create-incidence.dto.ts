import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';

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

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsBoolean()
  valid?: boolean;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsString()
  severity: string;

  @IsNotEmpty()
  @IsNumber()
  period: number;

  @IsOptional()
  @IsDateString()
  created_at: Date;

  @IsOptional()
  @IsNumber()
  comment?: number;
}
