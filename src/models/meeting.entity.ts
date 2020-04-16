import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity({ name: 'meetings' })
export class Meeting {

    @ObjectIdColumn()
    public _id: ObjectID

    @Column({ unique: false })
    public UserId: string

    @Column({ unique: true, length: 8 })
    public Code: string

    @Column({ unique: true })
    public MeetingId: string

    @Column()
    public Name: string

    @Column()
    public Description: string

    @Column()
    public CreatedOn: Date

    @Column()
    public EditedOn: Date
}