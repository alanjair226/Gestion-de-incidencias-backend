import { IsBoolean, IsDate, IsInt, IsString } from "class-validator";
import { PrimaryGeneratedColumn, Timestamp } from "typeorm";

export class CreateIncidenceDto {

    @IsString()
    description:string;

    @IsInt()
    assigned_to: number;

    @IsInt()
    created_by: number;

    @IsInt()
    value: number;

    @IsBoolean()
    status: boolean;

    @IsInt()
    severity_id: number;

    @IsInt()
    trimester_id: number;

    @IsDate()
    created_at: Timestamp;
}
