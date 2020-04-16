import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { AccountService } from '../services/account.service'
import { IAccount } from '../../modules/auth/models/account.interface'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy)
{
    constructor(private readonly accountService: AccountService)
    {
        super()
    }

    public async validate(username: string, password: string): Promise<IAccount>
    {
        const user = await this.accountService.findAccount({ UserName: username })

        if (!user) throw new NotFoundException()

        const hash = this.accountService.generatePasswordHash(password, user.Salt)

        if (user.Hash === hash)
        {
            return user
        }
        else
        {
            throw new NotFoundException()
        }
    }
}