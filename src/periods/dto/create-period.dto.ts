import { IsBoolean, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePeriodDto {
  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @IsNotEmpty()
  @IsBoolean()
  is_open: boolean;
}
