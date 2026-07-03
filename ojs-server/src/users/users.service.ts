import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { User } from './users.entities';
import * as bcrypt from "bcrypt"
import { CreateUserDto } from './DTO/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const existing = await this.userRepository.findOneBy({email:dto.email})

        if (existing) {
            throw new ConflictException("Email already in use")
        }

        const hashedPass = await bcrypt.hash(dto.password, 10)

        const user = this.userRepository.create({
            ...dto,
            password:hashedPass
        })

        return this.userRepository.save(user)
    }
}
