import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {CreateRoleDto} from "../roles/dto/create-role.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {}

    public async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER")
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    public async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    public async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    public async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)
        if (role && user) {
            await user.$add('role', role.id);
            return dto
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
    }

    public async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        user.banned = true
        user.banReason = dto.banReason
        await user.save();
        return user;
    }

    public async unban(userId: number): Promise<User> {
        const user: User = await this.userRepository.findByPk(userId);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        } else if (!user.banned) {
            throw new HttpException('User is not banned', HttpStatus.NOT_ACCEPTABLE)
        }
        user.banned = false;
        user.banReason = null;
        await user.save();
        return user
    }
}
