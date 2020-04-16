import { MongoEntityManager, getMongoManager, ObjectLiteral } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Meeting } from '@/models/meeting.entity'

@Injectable()
export class MeetingService {

    private readonly manager: MongoEntityManager = getMongoManager()

    public async fetchAllMeetings(query: ObjectLiteral): Promise<Meeting[]> {
        return await this.manager.find(Meeting, query)
    }

    public async createMeeting(meeting: any): Promise<any> {
        return await this.manager.insert(Meeting, meeting)
    }

    public async verifyMeeting(query: ObjectLiteral): Promise<any> {
        try {
            return await this.manager.findOne(Meeting, query)
        } catch (error) {
            return undefined
        }
    }

    public async updateMeeting(query: { MeetingId: string }, params: any): Promise<any> {
        return await this.manager.updateOne(Meeting, query, params)
    }

    public async deleteMeeting(query: { MeetingId: string }): Promise<any> {
        return await this.manager.deleteOne(Meeting, query)
    }

}