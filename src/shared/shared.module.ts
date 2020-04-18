import { Module } from '@nestjs/common'
import { AccountService } from '@/modules/account/service/account.service'
import { DatabaseModule } from './database.module'
import { JwtModule } from '@nestjs/jwt'
import { RSA_PRIVATE_KEY, RSA_PUBLIC_KEY } from 'config/keys.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountModule } from '@/modules/account/account.module'
import { NotificationsModule } from '@/modules/notifications/notifications.module'

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            privateKey: RSA_PRIVATE_KEY,
            publicKey: RSA_PUBLIC_KEY,
            signOptions: {
                expiresIn: '7d'
            }
        }),
        AccountModule,
        NotificationsModule

    ],
    exports: [
        DatabaseModule,
        JwtModule,
        AccountModule,
        NotificationsModule
    ]
})
export class SharedModule {}