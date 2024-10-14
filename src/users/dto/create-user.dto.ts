import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'user@gmail.com', description: 'Email'})
    readonly email: string;
    @ApiProperty({example: 'Password123!', description: 'Password'})
    readonly password: string;
}