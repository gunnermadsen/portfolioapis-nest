import { Controller, Post, Body, Res, Req, BadRequestException } from '@nestjs/common'
import { Request, Response } from 'express'
import * as path from 'path'
import { NotificationsService } from '../../notifications/services/notifications.service'
import { AccountService } from '../../../shared/services/account.service'
import { AccountModel } from '../models/account.model'
import { IAccount } from '../models/account.interface'


@Controller('api')
export class RegistrationController
{
    constructor(private readonly notificationService: NotificationsService, private readonly accountService: AccountService)
    {}
    
    @Post('register')
    public async register(@Res() response: Response, @Body() body: any): Promise<Response | void>
    {
        const { username, email, password } = body

        if (!username || !email || !password) throw new BadRequestException()

        const account = new AccountModel(username, email, password, this.accountService.generatePasswordHash)
        const result = await this.accountService.createAccount(account)

        if (result) 
        {
            return response.status(200).json({ message: "Your account has been created successfully" })
        } 
        else 
        {
            throw new BadRequestException()
        }
    }

    private prepareAdditionalAccountFeatures(result: IAccount): void
    {
        const cwd = path.join(__dirname, '..', 'coolshare', 'repository')
        // const directory = path.join(cwd, result._id.toString())
        const file: string = path.join(cwd, 'Getting Started.pdf').replace(/(\s+)/g, '\\$1')

        const userNotificationModel: any = {
            Notifications: [],
            UserId: result._id.toString(),
            NotificationBadgeHidden: true
        }

        const notification = this.notificationService.createNotificationDocument(userNotificationModel)
        // fs.mkdirSync(directory, 0o755)
        // fs.mkdirSync(`thumbnails/${result._id}`)
        // cmd.run(`cp -r ${file} ${directory}`)
        // cmd.run(`cp thumbnails/"Getting Started.png" thumbnails/${result._id}`)
    }
}