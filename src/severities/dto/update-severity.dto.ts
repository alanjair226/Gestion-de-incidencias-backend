import { IsOptional, IsString } from 'class-validator';

export class UpdateSeverityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  value?: string;
}
