import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { AccountService } from '../../modules/account/service/account.service'
import { IAccount } from '../../modules/auth/models/account.interface'
import { AuthenticationService } from '@/modules/auth/services/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy)
{
    constructor(private readonly authService: AuthenticationService, private readonly accountService: AccountService)
    {
        super()
    }

    public async validate(username: string, password: string): Promise<IAccount>
    {
        const user = await this.accountService.findAccount({ UserName: username })

        if (!user) throw new NotFoundException("Your username or password is incorrect")

        const hash = this.authService.generatePasswordHash(password, user.Salt)

        if (user.Hash === hash)
        {
            return user
        }
        else
        {
            throw new NotFoundException("Your username or password is incorrect")
        }
    }
}