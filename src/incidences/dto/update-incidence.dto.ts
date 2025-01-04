import { PartialType } from '@nestjs/swagger';
import { CreateIncidenceDto } from './create-incidence.dto';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateIncidenceDto {
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    description?: string;
  
    @IsOptional()
    @IsNumber()
    assigned_to?: number; // ID del usuario asignado
  
    @IsOptional()
    @IsNumber()
    created_by?: number; // ID del usuario que crea la incidencia
  
    @IsOptional()
    @IsNumber()
    value?: number;
  
    @IsOptional()
    @IsBoolean()
    status?: boolean;
  
    @IsOptional()
    @IsNumber()
    severity?: number; // ID de la severidad
  
    @IsOptional()
    @IsNumber()
    period?: number; // ID del periodo
  
    @IsOptional()
    @IsDateString()
    created_at?: Date;
  
    @IsOptional()
    @IsNumber()
    comment?: number; // ID del comentario asociado
  }