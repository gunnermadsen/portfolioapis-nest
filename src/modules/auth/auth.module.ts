import { AuthenticationController } from './controllers/authentication.controller'
import { RegistrationController } from './controllers/registration.controller'

import { NotificationsModule } from '../notifications/notifications.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from '../../shared/strategies/local.strategy'
import { JwtStrategy } from '../../shared/strategies/jwt.strategy'
import { SharedModule } from '@/shared/shared.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PasswordStrengthGuard } from '../../shared/guards/password-strength.guard'
import { ExistingUserGuard } from '../../shared/guards/existing-user.guard'

@Module({
    imports: [
        SharedModule,
        PassportModule, //.register({ defaultStrategy: 'local' }),
        NotificationsModule,
    ],
    providers: [
        JwtStrategy,
        LocalStrategy,
        {
            provide: 'PASSWORD_STRENGTH',
            useClass: PasswordStrengthGuard
        },
        {
            provide: 'EXISTING_USER',
            useClass: ExistingUserGuard
        }
    ],
    controllers: [
        AuthenticationController, 
        RegistrationController,
    ],
    
})
export class AuthModule {}
