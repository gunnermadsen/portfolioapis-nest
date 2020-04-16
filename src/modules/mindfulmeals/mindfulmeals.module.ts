import { Module, NestModule, MiddlewareConsumer, NestMiddleware, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { SharedModule } from '@/shared/shared.module';
import { LogInterceptor } from '@/middleware/log.interceptor';
import { KitchenController } from './controllers/kitchen.controller';
import { MindfulMealsService } from './services/mindfulmeals.service';

@Module({
    imports: [
        SharedModule,
    ],
    controllers: [
        KitchenController,

    ],
    providers: [
        MindfulMealsService
    ]
})
export class MindfulMealsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LogInterceptor).forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}