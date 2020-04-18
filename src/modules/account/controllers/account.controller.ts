import { Controller, Get, Res, Req, UseGuards, NotFoundException, InternalServerErrorException, Delete } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from '@/modules/account/service/account.service'

@Controller('api/account')
export class AccountController
{
    constructor(private readonly accountService: AccountService)
    { }

    @UseGuards(AuthGuard('jwt'))
    @Get('')
    public async getAccountInfo(@Req() request: Request, @Res() response: Response): Promise<Response>
    {
        try
        {
            const user = await this.accountService.findAccount({ UserName: request.user['username'] })

            if (!user) throw new NotFoundException()

            const payload = {
                username: user.UserName,
                firstname: user.FirstName,
                lastname: user.LastName,
                email: user.Email,
                picture: user.ProfilePicture,
                id: user._id
            }

            return response.status(200).json(payload)
        }
        catch (error)
        {
            throw new InternalServerErrorException(error)
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    public async deleteAccount(@Req() request: Request, @Res() response: Response): Promise<void>
    {
        try
        {
            const result = await this.accountService.deleteAccount({ _id: request.params.id })

            if (result) 
            {
                return response.status(204).end()
            } 
            else 
            {
                throw new NotFoundException()
            }
        } 
        catch (error) 
        {
            throw new InternalServerErrorException(error)
        }
    }
}