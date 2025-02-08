import { IsString, IsNotEmpty, IsInt, IsEmpty, IsOptional } from 'class-validator';

export class CreateImageIncidenceDto {
    @IsString()
    @IsOptional()
    url: string;

    @IsString()
    @IsNotEmpty()
    incidenceId: string;
}
