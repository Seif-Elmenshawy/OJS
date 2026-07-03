import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-jwt"
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";

interface JwtPayload {
    sub: string,
    email: string,
    role: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        const secret = config.get<string>("JWT_SECRET")!   
        super({
            jwtFromRequest: (req: Request) => {
                return req.cookies.token
            },
            ignoreExpiration: false,
            secretOrKey: secret
        })
    }

    async validate(payload: JwtPayload){
        if (!payload) {
            throw new UnauthorizedException()
        }

        return {
            id: payload.sub,
            email:payload.email,
            role:payload.role
        }
    }
}