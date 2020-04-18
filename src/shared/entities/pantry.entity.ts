import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { IPantry } from '@/modules/mindfulmeals/models/pantry.model'

@Entity({ name: 'pantryitems' })
export class Pantry
{
    @ObjectIdColumn()
    public _id: ObjectID

    @Column()
    public Name: String

    @Column()
    public Quantity: Number

    @Column()
    public UserId: String

    @Column()
    public ExpirationDate: Date

    @Column()
    public Category: String

    @Column()
    public ExpirationStatus: String

    @Column()
    public Calories: Number

    @Column()
    public ServingSize: Number

    @Column()
    public Tags: String[]

    @Column()
    public CreatedOn: Date

    @Column()
    public IsDeleted: Boolean

    @Column()
    public UpdatedOn: Date
}