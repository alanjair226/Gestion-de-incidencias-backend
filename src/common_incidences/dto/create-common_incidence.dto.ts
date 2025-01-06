import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateCommonIncidenceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  incidence: string;

  @IsNotEmpty()
  @IsString()
  severity: string;
}

