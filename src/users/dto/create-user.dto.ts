import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'user@gmail.com', description: 'Email'})
    @IsString({message: 'Must be a string value'})
    @IsEmail({},{message: 'Incorrect email'})
    readonly email: string;

    @ApiProperty({example: 'Password123!', description: 'Password'})
    @IsString({message: 'Must be a string value'})
    @Length(4,16,{message: 'Must be in between 4 and 16 characters'})
    readonly password: string;
}