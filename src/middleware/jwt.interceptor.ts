import { Request, Response } from 'express';
import { NextFunction } from "express";
import { NestMiddleware, Injectable, InternalServerErrorException, NotFoundException, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from "@nestjs/common";
import { AccountService } from '../shared/services/account.service';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


export interface HttpResponse<T> {
    data: T
}

@Injectable()
export class JwtInterceptor<T> implements NestInterceptor<HttpResponse<T>> {
    constructor(private readonly accountService: AccountService) {}
    public async use(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

        let token = request.headers.authorization

        try {
            if (token && token.startsWith('Bearer ')) {
                // const user = await this.accountService.findAccount(request.body.username)
                token = token.slice(7, token.length).trimLeft()
                
                // lets see what verifySessionToken returns, 
                // when the token expires in 20 seconds
                const user = await this.accountService.verifySessionToken(token)

                const now = Date.now()

                next()
                // if (user.exp > now) {
                //     next()
                // } else {
                //     return response.status(401).json({ message: "your are not authorized to access this resource" })
                // }
 
            } else {
                throw new NotFoundException({ message: "A valid token is required to access this resource" })
            }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    // Dont forget to decorate methods that accept jwt tokens

    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map( async (request: Request) => {
                try {
                    let token = request.headers.authorization
    
                    if (token && token.startsWith('Bearer ')) {
                        token = token.slice(7, token.length).trimLeft()
                        const user = await this.accountService.verifySessionToken(token)
                        return user
                    }
    
                    return EMPTY

                } catch (error) {
                    return EMPTY
                }
            }),
            map((data) => ({ data })),
            catchError(error => throwError(new BadGatewayException(error))),
        )
    }
}