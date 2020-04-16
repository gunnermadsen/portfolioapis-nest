import { Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common'
import { Response, Request } from 'express'
import { AuthGuard } from '@nestjs/passport';

import { AccountService } from '@/shared/services/account.service'
import { LocalAuthGuard } from '@/shared/guards/local-auth.guard';

@Controller('api')
export class AuthenticationController
{
    constructor(private readonly accountService: AccountService)
    { }

    @UseGuards(LocalAuthGuard)
    @Post('auth')
    public authenticate(@Req() request: Request, @Res() response: Response): Response
    {
        const user = request.user as any
        const token = this.accountService.generateSessionToken(user)
        const csrfToken = this.accountService.generateRandomBytes(16)

        response.cookie("SESSIONID", token, { maxAge: 3600000, httpOnly: true, secure: false })
        response.cookie("XSRF-TOKEN", csrfToken)
        
        return response.status(200).json({ JWTToken: token, CSRFToken: csrfToken, Id: user._id.toString() })
    }


    @Get('')
    public testApi(@Res() response: Response): Response
    {
        return response.status(200).json({ message: "portfolio at endpoint: '/api' is accessible" })
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('logout')
    public logout(@Res() response: Response): Response
    {
        response.clearCookie("SESSIONID")
        response.clearCookie("XSRF-TOKEN")
        return response.status(200).json({ message: 'Logout Successful' })
    }

}