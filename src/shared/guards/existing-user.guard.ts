import { Injectable, BadRequestException, CanActivate, ExecutionContext } from '@nestjs/common'
import { AccountService } from '../../modules/account/service/account.service'

@Injectable()
export class ExistingUserGuard implements CanActivate {
    constructor(private accountService: AccountService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest()

        const { UserName, Email } = request.body

        if (!UserName || !Email) {
            throw new BadRequestException()
        }

        const query = {
            $or: [
                { UserName: UserName },
                { Email: Email }
            ]
        }

        const duplicate = await this.accountService.findAccount({ UserName: UserName })

        if (duplicate) {
            throw new BadRequestException("Username or email is already taken")
        }

        return true
    }
}