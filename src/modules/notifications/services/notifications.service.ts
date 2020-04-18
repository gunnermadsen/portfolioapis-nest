import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getMongoManager, MongoEntityManager } from 'typeorm';
import { Notifications } from '../../../shared/entities/notifications.entity';

@Injectable()
export class NotificationsService {

    private readonly manager: MongoEntityManager = getMongoManager()

    public async findNotifications(userId: string): Promise<Notifications | undefined> {
        try {
            const notifications = await this.manager.findOne<Notifications>(Notifications, { UserId: userId })
            return notifications
        } catch (error) {
            return undefined
        }
    }

    public async findNotification(userId: string): Promise<Notifications[] | undefined> {
        try {
            const notifications = await this.manager.find<Notifications>(Notifications, { UserId: userId })
            return notifications
        } catch (error) {
            return undefined
        }
    }

    public async updateNotification(conditions: any, query: any): Promise<any> {
        try {
            const result = await this.manager.updateOne<Notifications>(Notifications, conditions, query)
            return result
        } catch (error) {
            return undefined
        }
    }

    public createNotificationDocument(document: any): any {
        try {
            const result = this.manager.create<Notifications>(Notifications, document)
            return result
        } catch (error) {
            return undefined
        }
    }

}
