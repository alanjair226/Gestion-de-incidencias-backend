import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSeverityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}
