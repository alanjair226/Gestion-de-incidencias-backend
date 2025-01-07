import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs'
import { LoginDto } from 'src/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async register({username, email, password, role}: RegisterDto){

        const user =  await this.usersService.findOneByEmail(email)

        if(user){
            throw new BadRequestException("User already exists")
        }

        await this.usersService.create({
            username,
            email,
            password: await bcryptjs.hash(password, 10),
            role
        });

        return {
            username, email
        }
    }
    
    async login({email, password}:LoginDto){

        const user =  await this.usersService.findByEmailWithPassword(email)

        if(!user){
            throw new UnauthorizedException('email is wrong') 
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)

        if(!isPasswordValid){
            throw new UnauthorizedException('password is wrong')
        }

        const payload = { email: user.email, role: user.role}

        const token = await this.jwtService.signAsync(payload)

        return {token, email};
    }

    async profile({email, role}:{email:string, role:string}){

        return await this.usersService.findOneByEmail(email);
    }

}
