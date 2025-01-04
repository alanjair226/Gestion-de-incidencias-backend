import { IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class UpdatePeriodDto {
  @IsOptional()
  @IsDateString()
  start_date?: Date;

  @IsOptional()
  @IsDateString()
  end_date?: Date;

  @IsOptional()
  @IsBoolean()
  is_open?: boolean;
}
