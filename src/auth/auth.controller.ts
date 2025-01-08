import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { Request } from 'express';
import { Role } from '../common/enum/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorators';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';

interface RequestWithUser extends Request{
    user:{
        email: string,
        role: string
    }
}


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,){}

    
    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ){
        console.log(registerDto)
        return this.authService.register(registerDto);
    }

    @Auth([Role.SUPERADMIN])
    @Patch('/update-password/:id')
    updatePassword(
        @Param('id') id: string,
        @Body() password: UpdatePasswordDto
    ){
        return this.authService.updatePassword(+id , password );
    }
    
    @Post('login')
    login(
        @Body()
        loginDto:LoginDto
    ){
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth([Role.ADMIN])
    profile(@ActiveUser() user: UserActiveInterface){
        return this.authService.profile(user)
    }

}
