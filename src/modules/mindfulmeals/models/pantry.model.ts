import { ObjectID } from "typeorm";

export interface IPantry
{
    _id: ObjectID
    Name: String
    Quantity: Number
    UserId: String
    ExpirationDate: Date
    Category: String
    ExpirationStatus: String
    Calories: Number
    ServingSize: Number
    Tags: String[]
    CreatedOn: Date
    IsDeleted: Boolean
    UpdatedOn: Date
}