import { IAccount } from "./account.interface"
import { ObjectId } from 'mongodb'
import { randomBytes } from "crypto"
export class AccountModel implements IAccount {
    public _id: ObjectId = new ObjectId()
    public UserName: string = null
    public FirstName: string = null
    public LastName: string = null
    public Email: string = null
    public Salt: string = null
    public Hash: string = null
    public ProfilePicture: string = null
    public CreatedOn: Date = new Date()
    public EditedOn: Date = new Date()

    constructor(username: string, email: string, password: string, generatePasswordHash: Function) {
        this.Salt = randomBytes(16).toString('hex')
        this.Hash = generatePasswordHash(password, this.Salt)
        
        this.Email = email
        this.UserName = username
    }
}