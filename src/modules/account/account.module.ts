import { Module } from '@nestjs/common'
import { AccountController } from '@/modules/account/controllers/account.controller'
import { SharedModule } from '@/shared/shared.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account } from '@/shared/entities/account.entity'
import { AccountService } from './service/account.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Account])
    ],
    controllers: [
        AccountController
    ],
    providers: [
        AccountService
    ],
    exports: [
        AccountService
    ]
})
export class AccountModule {}
