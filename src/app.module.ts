import { Module, NestModule, MiddlewareConsumer, NestMiddleware, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@/modules/auth/auth.module'

import { SharedModule } from './shared/shared.module'
import { LogInterceptor } from './middleware/log.interceptor'
import { MeetingModule } from './modules/meeting/meeting.module'
import { MindfulMealsModule } from './modules/mindfulmeals/mindfulmeals.module'
import { NotificationsModule } from './modules/notifications/notifications.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    AuthModule,
    MeetingModule,
    MindfulMealsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LogInterceptor)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}