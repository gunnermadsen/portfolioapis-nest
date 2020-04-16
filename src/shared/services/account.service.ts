import { Injectable, InternalServerErrorException, BadRequestException, ConflictException } from '@nestjs/common'
import { MongoEntityManager, getMongoManager, InsertResult, ObjectLiteral } from 'typeorm'

import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'

import * as crypto from 'crypto'
import { IAccount } from '../../modules/auth/models/account.interface'
import { Account } from '@/models/account.entity'
import { RequestLog } from '@/models/log.entity'
import { RequestModel } from '../models/request-log.model'

@Injectable()
export class AccountService 
{
    private readonly manager: MongoEntityManager = getMongoManager()

    constructor(private readonly jwtService: JwtService) 
    { }

    public async findAccount(query: ObjectLiteral): Promise<Account | undefined>
    {
        try 
        {
            const account = await this.manager.findOne(Account, query)
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

    public async verifySessionToken(token: string): Promise<any | void>
    {
        try 
        {
            const payload = await this.jwtService.verify(token)
            return payload
        } 
        catch (error) 
        {
            throw new InternalServerErrorException(error)
        }
    }

    public generateSessionToken(account: ObjectLiteral): string 
    {
        const payload = {
            sub: account._id,
            username: account.UserName,
        }

        return this.jwtService.sign(payload, { algorithm: 'RS512' })
    }

    public generatePasswordHash(password: string, salt: string): string 
    {
        return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    }

    public generateRandomBytes(bytes: number): string 
    {
        return crypto.randomBytes(bytes).toString('hex')
    }

}