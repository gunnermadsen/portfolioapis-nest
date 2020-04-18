import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { IAccount } from '../../modules/auth/models/account.interface'

@Entity({ name: 'users' })
export class Account implements IAccount {

    @ObjectIdColumn()
    public _id: ObjectID

    @Column({ unique: true })
    public UserName: string

    @Column()
    public FirstName: string

    @Column()
    public LastName: string

    @Column({ unique: true })
    public Email: string

    @Column()
    public Salt: string

    @Column({ unique: true })
    public Hash: string

    @Column()
    public ProfilePicture: string

    @Column()
    public CreatedOn: Date

    @Column()
    public EditedOn: Date

}