import {Body, Controller, Post, Get, UseGuards, Param} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/role-guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }


    @ApiOperation({summary: 'Get all users(for ADMINS only)'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary: 'Set role(for ADMINS only)'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() addRoleDto: AddRoleDto) {
        return this.usersService.addRole(addRoleDto)
    }

    @ApiOperation({summary: 'Ban user(for ADMINS only)'})
    @ApiResponse({status: 200, type: User})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() banUserDto: BanUserDto) {
        return this.usersService.ban(banUserDto)
    }

    @ApiOperation({summary: 'Unban user(for ADMINS only)'})
    @ApiResponse({status: 200, type: User})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/unban/:id')
    unban(@Param('id') userId: number) {
        return this.usersService.unban(userId)
    }
}
