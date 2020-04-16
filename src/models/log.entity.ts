import { Column, ObjectID, ObjectIdColumn, Entity } from "typeorm"
import { IRequestLog } from "@/modules/notifications/models/log.interface"

@Entity({ name: 'requestlogs'})
export class RequestLog implements IRequestLog {
    
    @ObjectIdColumn()
    public _id: ObjectID

    @Column()
    public ip: string
    
    @Column()
    public method: string
    
    @Column()
    public ips: string[]
    
    @Column()
    public isSecure: boolean
    
    @Column()
    public hostname: string
    
    @Column()
    public isXHR: boolean
    
    @Column()
    public cookies: any
    
    @Column()
    public url: string
    
    @Column()
    public baseUrl: string
    
    @Column()
    public originalUrl: string
    
    @Column()
    public timestamp: Date
    
    @Column()
    public protocol: string
    
    @Column()
    public subdomains: string[]
    
    @Column()
    public statusCode: number

}