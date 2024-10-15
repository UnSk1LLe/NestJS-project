import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/sign-in')
    signIn(@Body() userDto: CreateUserDto) {
        return this.authService.signIn(userDto);
    }

    @Post('/sign-up')
    signUp(@Body() userDto: CreateUserDto) {
        return this.authService.signUp(userDto);
    }
}
