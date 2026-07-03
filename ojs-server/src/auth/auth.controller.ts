import { Body, Controller, Post, Get, Req, Res, UseGuards, Delete, UnauthorizedException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '../users/DTO/create-user.dto';

import { JwtAuthGuard } from './guards/jwt.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const { token, user } = await this.authService.register(dto)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 100
    })
    return { user, token }
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { token, user } = await this.authService.login(dto)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return { user, token }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    await this.authService.delete(req.user.id)
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: 'lax'
    })

    return { message: "User Deleted Successfully" }

  }
}
