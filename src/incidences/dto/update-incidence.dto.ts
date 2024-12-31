import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateIncidenceDto {
    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsInt()
    assigned_to: number;

    @IsOptional()
    @IsInt()
    created_by: number;

    @IsOptional()
    @IsInt()
    value: number;

    @IsOptional()
    @IsBoolean()
    status: boolean;

    @IsOptional()
    @IsInt()
    severity_id: number;

}
