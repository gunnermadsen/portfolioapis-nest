import { Module, NestModule, MiddlewareConsumer, NestMiddleware, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@/modules/auth/auth.module';

import { AccountModule } from '@/modules/account/account.module';
import { SharedModule } from './shared/shared.module';
import { LogInterceptor } from './middleware/log.interceptor';
import { MeetingModule } from './modules/meeting/meeting.module';
import { MindfulMealsModule } from './modules/mindfulmeals/mindfulmeals.module';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    AccountModule,
    MeetingModule,
    MindfulMealsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LogInterceptor)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}