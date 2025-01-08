import { PartialType } from '@nestjs/swagger';
import { CreateIncidenceDto } from './create-incidence.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateIncidenceCommentDto{
    @IsNotEmpty()
    @IsString()
    comment: string;

    @IsOptional()
    @IsBoolean()
    @Exclude()
    status: boolean;
}