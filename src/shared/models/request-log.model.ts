import { Request } from "express"
import { IRequestLog } from "@/modules/notifications/models/log.interface"

export class RequestModel implements IRequestLog
{
    public ip: string
    public ips: string[]
    public isSecure: boolean
    public hostname: string
    public isXHR: boolean
    public cookies: any
    public url: string
    public method: string
    public protocol: string
    public subdomains: string[]
    public baseUrl: string
    public originalUrl: string
    public timestamp: Date
    constructor(request: Request) 
    {
        this.ip = request.ip,
        this.ips = request.ips,
        this.isSecure = request.secure,
        this.hostname = request.hostname,
        this.isXHR = request.xhr,
        this.cookies = request.cookies,
        this.url = request.url,
        this.method = request.method,
        this.protocol = request.protocol,
        this.subdomains = request.subdomains,
        this.baseUrl = request.baseUrl,
        this.originalUrl = request.originalUrl,
        this.timestamp = new Date()
    }
}