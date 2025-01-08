import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "../../common/enum/rol.enum";

export class UpdatePasswordDto{
    @Transform(( {value} ) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}