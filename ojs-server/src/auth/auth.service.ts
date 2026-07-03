import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginDto } from '../users/DTO/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async register(dto: CreateUserDto) {
    try {
      const user = await this.usersService.createUser(dto)
      return this.buildAuthResponse(user)
    } catch (error) {
      throw new InternalServerErrorException("Internal Server Error")
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.usersService.loginUser(dto)
      return this.buildAuthResponse(user)
    } catch (error) {
      throw new InternalServerErrorException("Internal Server Error")
    }
  }

  async delete(id: string) {
    try {
      await this.usersService.deleteUser(id)
    } catch (error) {
      throw new InternalServerErrorException("Internal Server Error")
    }
  }

  private buildAuthResponse(user: { id: string, email: string, role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role }
    return {
      token: this.jwtService.sign(payload),
      user
    }
  }
}
