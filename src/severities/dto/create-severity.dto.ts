import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSeverityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
