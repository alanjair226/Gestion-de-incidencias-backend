import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "../../common/enum/rol.enum";

export class RegisterDto{
    @IsString()
    @MinLength(4)
    username: string;

    @IsEmail()
    email: string;

    @Transform(( {value} ) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(Role, {message: "El rol debe ser user o admin"})
    @IsOptional()
    role: string
}