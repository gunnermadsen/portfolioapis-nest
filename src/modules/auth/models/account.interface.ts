import { ObjectID } from "typeorm";
import { ObjectId } from "mongodb";

export interface IAccount {
    _id: ObjectId
    UserName: string
    FirstName: string
    LastName: string
    Email: string
    Salt: string
    Hash: string
    ProfilePicture: string
    CreatedOn: Date
    EditedOn: Date
}