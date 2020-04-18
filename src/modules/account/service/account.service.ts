import { Injectable, InternalServerErrorException, BadRequestException, ConflictException } from '@nestjs/common'
import { MongoEntityManager, getMongoManager, InsertResult, ObjectLiteral, MongoRepository } from 'typeorm'

import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'

import { IAccount } from '../../auth/models/account.interface'
import { Account } from '@/shared/entities/account.entity'
import { RequestLog } from '@/shared/entities/log.entity'
import { RequestModel } from '../../../shared/models/request-log.model'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AccountService 
{
    constructor(@InjectRepository(Account) private accountRepository: MongoRepository<Account>) 
    { }

    private readonly manager: MongoEntityManager = getMongoManager()

    public async findAccount(query: ObjectLiteral): Promise<Account | undefined>
    {
        try 
        {
            const account = await this.accountRepository.findOne(query)
            return account
        } 
        catch (error) 
        {
            throw new BadRequestException()
        }
    }

    public async createAccount(account: IAccount): Promise<any>
    {
        try 
        {
            return await this.manager.insert<Account>(Account, account)
        } 
        catch (error) 
        {
            switch (error.code) 
            {
                case 11000: 
                {
                    throw new ConflictException("The username or email is already taken")
                }
                default: 
                {
                    throw new BadRequestException(error)
                }
            }
        }
    }

    public async logRequest(request: Request): Promise<InsertResult> 
    {
        try 
        {
            const result = new RequestModel(request)
            return await this.manager.insert<RequestLog>(RequestLog, result)
        } 
        catch (error) 
        {
            return undefined
        }
    }

    public async deleteAccount(query: ObjectLiteral): Promise<any>
    {
        return await this.manager.findOneAndDelete<Account>(Account, query)
    }

}