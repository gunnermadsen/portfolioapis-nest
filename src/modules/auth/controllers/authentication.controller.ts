import { Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common'
import { Response, Request } from 'express'
import { AuthGuard } from '@nestjs/passport';

import { LocalAuthGuard } from '@/shared/guards/local-auth.guard';
import { AuthenticationService } from '../services/auth.service';
import { CsrfGuard } from '@/shared/guards/csrf.guard';
import { JwtStrategy } from '@/shared/strategies/jwt.strategy';

@Controller('api')
export class AuthenticationController
{
    constructor(private readonly authService: AuthenticationService)
    { }

    @UseGuards(LocalAuthGuard)
    @Post('auth')
    public authenticate(@Req() request: Request, @Res() response: Response): Response
    {
        const user = request.user as any
        const token = this.authService.generateSessionToken(user)
        const csrfToken = this.authService.generateRandomBytes(64)

        response.cookie("access_token", token, { maxAge: 3600000 * 24, httpOnly: false })
        response.cookie("csrf_token", csrfToken)

        const account = {
            id: user._id,
            jwtToken: token,
            csrfToken: csrfToken,
            username: user.UserName,
            email: user.Email,
            firstname: user.FirstName,
            lastname: user.LastName
        }
        
        return response.status(200).json(account)
    }


    @Get('')
    public testApi(@Res() response: Response): Response
    {
        return response.status(200).json({ message: "portfolio at endpoint: '/api' is accessible" })
    }

    @UseGuards(AuthGuard('jwt'))
    @UseGuards(CsrfGuard)
    @Get('csrf/test')
    public testCsrfApi(@Res() response: Response): Response
    {
        return response.status(200).json({ message: "portfolio at endpoint: '/api/csrf/test' is accessible" })
    }

    @UseGuards(AuthGuard('jwt'))
    @UseGuards(CsrfGuard)
    @Get('logout')
    public logout(@Res() response: Response): Response
    {
        response.clearCookie("SESSIONID")
        response.clearCookie("XSRF-TOKEN")
        return response.status(200).json({ message: 'Logout Successful' })
    }

}