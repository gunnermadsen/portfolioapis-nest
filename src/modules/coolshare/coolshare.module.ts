import { Module, NestModule, MiddlewareConsumer, NestMiddleware, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { SharedModule } from '@/shared/shared.module';
import { LogInterceptor } from '@/middleware/log.interceptor';


@Module({
    imports: [
        SharedModule,
    ],
    controllers: [],
    providers: []
})
export class CoolshareModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LogInterceptor).forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}