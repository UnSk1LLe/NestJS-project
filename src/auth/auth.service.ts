import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {User} from "../users/users.model";
import * as http from "node:http";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

   constructor(private usersService: UsersService,
               private jwtService: JwtService) {}

    async signIn( userDto: CreateUserDto) {
        const user = this.validateUser(userDto);
        return this.generateToken(await user);
    }

    async signUp( userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException(`User with the email "${userDto.email}" already exists`, HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 10);
        const user = await this.usersService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user)
   }

   private async generateToken(user: User) {
       const payload = {email: user.email, id: user.id, roles: user.roles};
       return {
           token: this.jwtService.sign(payload)
       }
   }

   private async validateUser(userDto: CreateUserDto) :Promise<User> {
       const user = await this.usersService.getUserByEmail(userDto.email);
       const passwordEquals = await bcrypt.compare(userDto.password, user.password);
       if (user && passwordEquals) {
           return user;
       }

       throw new UnauthorizedException("Invalid email or password");
   }

}
