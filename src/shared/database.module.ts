import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account } from '@/models/account.entity';
import { RequestLog } from '@/models/log.entity';
import { Notifications } from '@/models/notifications.entity';
import { Meeting } from '@/models/meeting.entity';
import { Recipe } from '@/models/recipe.entity';

@Module({
    imports: [
        
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: 'ds131676.mlab.com',
            port: 31676,
            username: 'heroku_cf279h4z',
            password: '8tuqnuihu94nu4j3mdft4ku5pf',
            database: 'heroku_cf279h4z',
            entities: [
                Account,
                Recipe,
                RequestLog, 
                Notifications, 
                Meeting
            ],
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
