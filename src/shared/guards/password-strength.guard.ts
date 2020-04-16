import { Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, InternalServerErrorException, BadRequestException, CanActivate, ExecutionContext } from '@nestjs/common'
import { AccountService } from '../services/account.service'

@Injectable()
export class PasswordStrengthGuard implements CanActivate {

    public canActivate(context: ExecutionContext): any {

        const request = context.switchToHttp().getRequest()

        const { password } = request.body

        const expression = new RegExp(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/)

        if (password.match(expression)) {
            throw new BadRequestException("your password must contain at least 8 characters, with one number and one special character")
        }

        return true
    }
}