import { NextFunction, Request, Response } from 'express';
import { RequestLog } from '../models/log.entity';
import { NestMiddleware, Injectable } from '@nestjs/common';
import { getMongoManager, MongoEntityManager } from 'typeorm';
import { AccountService } from '@/shared/services/account.service';

@Injectable()
export class LogInterceptor implements NestMiddleware {
    constructor(private readonly accountService: AccountService) {}
    
    public async use(request: Request, response: Response, next: NextFunction): Promise<void> {

        const mode = process.env.NODE_ENV

        try {
            if (mode === "production") {

                const result = await this.accountService.logRequest(request)

            } 
            next()

        }
        catch (error) {
            next()
        }
    }
}