import { Module } from '@nestjs/common'

import { NotificationsModule } from '@/modules/notifications/notifications.module'
import { PassportModule } from '@nestjs/passport'
import { AccountController } from '@/modules/account/controllers/account.controller'
import { SharedModule } from '@/shared/shared.module'

@Module({
    imports: [
        SharedModule,
        // PassportModule,
        NotificationsModule,
    ],
    controllers: [
        AccountController
    ]
})
export class AccountModule {}
