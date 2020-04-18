import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { randomBytes, pbkdf2Sync } from 'crypto'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthenticationService 
{
    constructor(private readonly jwtService: JwtService) 
    { }
    
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
        return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    }

    public generateRandomBytes(bytes: number): string
    {
        return randomBytes(bytes).toString('hex')
    }
}
