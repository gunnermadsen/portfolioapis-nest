import { Module, NestModule, MiddlewareConsumer, NestMiddleware, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { SharedModule } from '@/shared/shared.module';
import { LogInterceptor } from '@/middleware/log.interceptor';
import { MeetingController } from './controllers/meeting.controller';
import { MeetingSocketController } from './providers/meeting.provider';
import { MeetingService } from './services/meeting.service';

@Module({
    imports: [
        SharedModule,
    ],
    controllers: [
        MeetingController,
        
    ],
    providers: [
        MeetingService,
        MeetingSocketController
    ]
})
export class MeetingModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LogInterceptor).forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}