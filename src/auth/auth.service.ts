import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs'
import { LoginDto } from 'src/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt'
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
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

    async updatePassword(id: number,{password}: UpdatePasswordDto){

        const user =  await this.userRepository.findOneBy({id})

        if(!user){
            throw new BadRequestException("User does not exist")
        }

        await this.usersService.create({
            ...user,
            password: await bcryptjs.hash(password, 10),
        });

        return {
            message: "password changed correctly"
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

        const payload = { id: user.id, email: user.email, role: user.role}

        const token = await this.jwtService.signAsync(payload)

        return {token, email};
    }

    async profile({id, email, role}:{id:number, email:string, role:string}){

        return await this.usersService.findOneByEmail(email);
    }

}
