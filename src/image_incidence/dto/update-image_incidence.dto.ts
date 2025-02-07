import { PartialType } from '@nestjs/swagger';
import { CreateImageIncidenceDto } from './create-image_incidence.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateImageIncidenceDto extends PartialType(CreateImageIncidenceDto) {
    @IsString()
    @IsOptional()
    url?: string;
}
