import { IsBoolean, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePeriodDto {
  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  end_date: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsBoolean()
  is_open: boolean;
}
