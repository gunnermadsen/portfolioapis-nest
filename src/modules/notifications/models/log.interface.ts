export interface IRequestLog {
    ip: string
    ips: string[]
    isSecure: boolean
    hostname: string
    isXHR: boolean
    cookies: any
    url: string
    method: string
    protocol: string
    subdomains: string[]
    baseUrl: string
    originalUrl: string
    timestamp: Date
}