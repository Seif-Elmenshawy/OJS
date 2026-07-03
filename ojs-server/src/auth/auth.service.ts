import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/DTO/create-user.dto';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

    register(dto: CreateUserDto) {
        try {
            const user = this.usersService.createUser(dto)
            return user
        } catch (error) {
            throw new InternalServerErrorException("Internal Server Error")
        }
    }
}
