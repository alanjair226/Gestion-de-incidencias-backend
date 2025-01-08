import { PartialType } from '@nestjs/swagger';
import { CreateIncidenceDto } from './create-incidence.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateIncidenceDto{
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    description: string;
    
    @IsOptional()
    @IsBoolean()
    valid?: boolean;
    
    @IsOptional()
    @IsBoolean()
    status: boolean;
    
    @IsOptional()
    @IsString()
    severity: string;
    
    @IsOptional()
    @IsString()
    comment?: string;
}