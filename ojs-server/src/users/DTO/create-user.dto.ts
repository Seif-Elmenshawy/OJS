import { IsEmail, IsString, MinLength, IsEnum } from "class-validator";
import { UserRole } from "../users.entities";

export class CreateUserDto {
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(8)
  password!: string

  @IsString()
  firstName!: string

  @IsString()
  lastName!: string

  @IsEnum(UserRole)
  role?: UserRole
}

export class LoginDto {
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(8)
  password!: string
}
