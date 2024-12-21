import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    username: string;

    @IsEmail()
    email: string;
    
    @Transform(( {value} ) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}
