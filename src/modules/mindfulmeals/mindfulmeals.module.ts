import { Module, NestModule, MiddlewareConsumer, NestMiddleware, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { SharedModule } from '@/shared/shared.module';
import { LogInterceptor } from '@/middleware/log.interceptor';
import { KitchenController } from './controllers/kitchen.controller';
import { CookbookService } from './services/cookbook.service';
import { PantryService } from './services/pantry.service';
import { Recipe } from '@/shared/entities/recipe.entity';
import { Pantry } from '@/shared/entities/pantry.entity';

@Module({
    imports: [
        SharedModule,
        TypeOrmModule.forFeature([Recipe, Pantry])
    ],
    controllers: [
        KitchenController,

    ],
    providers: [
        PantryService,
        CookbookService
    ]
})
export class MindfulMealsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void
    {
        consumer.apply(LogInterceptor).forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}