import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Account } from '@/shared/entities/account.entity';
import { RequestLog } from '@/shared/entities/log.entity';
import { Notifications } from '@/shared/entities/notifications.entity';
import { Meeting } from '@/shared/entities/meeting.entity';
import { Recipe } from '@/shared/entities/recipe.entity';
import { Pantry } from '@/shared/entities/pantry.entity';


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: 'ds131676.mlab.com',
            port: 31676,
            username: 'heroku_cf279h4z',
            password: '8tuqnuihu94nu4j3mdft4ku5pf',
            database: 'heroku_cf279h4z',
            // entities: [
            //     Account,
            //     Recipe,
            //     Pantry,
            //     RequestLog, 
            //     Notifications, 
            //     Meeting
            // ],
            // note, webpack does not support glob paths
            // entities: [
            //     __dirname + '/**/*.entity{.ts,.js}'
            // ],
            
            autoLoadEntities: true,
            // ssl: true,
            logging: "all",
            synchronize: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            keepConnectionAlive: true
        })
    ],
    exports: [
        TypeOrmModule
    ],
    controllers: [],
    providers: [],
})
export class DatabaseModule { }
