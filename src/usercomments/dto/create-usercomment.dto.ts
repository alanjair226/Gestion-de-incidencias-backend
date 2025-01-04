import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateUsercommentDto {
  @IsNotEmpty()
  @IsNumber()
  user: number; // ID del usuario que realiza el comentario

  @IsNotEmpty()
  @IsNumber()
  incidence: number; // ID de la incidencia asociada

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsDateString()
  created_at: Date;
}
