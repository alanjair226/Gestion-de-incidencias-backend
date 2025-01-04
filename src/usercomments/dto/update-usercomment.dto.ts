import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

export class UpdateUsercommentDto {
  @IsOptional()
  @IsNumber()
  user?: number; // ID del usuario que realiza el comentario

  @IsOptional()
  @IsNumber()
  incidence?: number; // ID de la incidencia asociada

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsDateString()
  created_at?: Date;
}
