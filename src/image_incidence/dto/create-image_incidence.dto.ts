import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateImageIncidenceDto {
    @IsString()
    @IsNotEmpty()
    url: string;

    @IsInt()
    @IsNotEmpty()
    incidenceId: number;
}
