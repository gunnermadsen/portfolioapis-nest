import { Injectable, BadRequestException, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AccountService } from '../../modules/account/service/account.service'
import { Request } from 'express'

@Injectable()
export class CsrfGuard implements CanActivate {
    constructor(private accountService: AccountService) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {

        // if (process.env.NODE_ENV === 'development') return true

        const request: Request = context.switchToHttp().getRequest()

        return true

        if (request.headers['x_csrf_token'] !== request.cookies['csrf_token']) {
            throw new UnauthorizedException("You are not authorized to access this resource")
        }

        return true
    }
}