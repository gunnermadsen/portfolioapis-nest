import { Module } from '@nestjs/common'
import { AccountService } from '@/shared/services/account.service'
import { DatabaseModule } from './database.module'
import { JwtModule } from '@nestjs/jwt'
import { RSA_PRIVATE_KEY, RSA_PUBLIC_KEY } from 'config/keys.config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule,
        JwtModule.register({
            privateKey: RSA_PRIVATE_KEY,
            publicKey: RSA_PUBLIC_KEY,
            signOptions: {
                expiresIn: '7d'
            }
        })
    ],
    exports: [
        DatabaseModule,
        AccountService,
        JwtModule,
    ],
    providers: [
        AccountService
    ]
})
export class SharedModule {}