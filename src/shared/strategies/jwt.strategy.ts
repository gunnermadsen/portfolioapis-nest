import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { RSA_PRIVATE_KEY, RSA_PUBLIC_KEY } from '@/../config/keys.config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')
{
    constructor()
    {
        const jwtOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: RSA_PUBLIC_KEY
        }
        super(jwtOptions)
    }

    public async validate(payload: any) 
    {
        return {
            ...payload
        }
    }
}