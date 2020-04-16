import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { INotification } from '../modules/notifications/models/notification.model'

@Entity({ name: 'notifications' })
export class Notifications {

    @ObjectIdColumn()
    public id: ObjectID

    @Column()
    public UserId: string

    @Column()
    public Notifications: INotification[]

    @Column()
    public NotificationBadgeHidden: boolean

}