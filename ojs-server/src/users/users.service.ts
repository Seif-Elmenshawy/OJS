import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { User } from './users.entities';
import * as bcrypt from "bcrypt"
import { CreateUserDto, LoginDto } from './DTO/create-user.dto';
import { createPublicKey } from 'crypto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async createUser(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOneBy({ email: dto.email })

    if (existing) {
      throw new ConflictException("Email already in use")
    }

    const hashedPass = await bcrypt.hash(dto.password, 10)

    const user = this.userRepository.create({
      ...dto,
      password: hashedPass
    })

    return this.userRepository.save(user)
  }

  async loginUser(dto: LoginDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: dto.email })
    if (!user) {
      throw new NotFoundException("Now user was found using this email")
    }

    const password = await bcrypt.compare(dto.password, user.password)
    if (!password) {
      throw new UnauthorizedException("Invalid password")
    }

    return user
  }

  async deleteUser(id: string) {
    const result = await this.userRepository.delete(id)

    if (result.affected == 0) {
      throw new NotFoundException("User not found")
    }
  }

}
