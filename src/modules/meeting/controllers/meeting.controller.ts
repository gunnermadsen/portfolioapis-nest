import { Controller, Get, Post, Body, Res, Request, UseGuards, HttpStatus, NotFoundException, InternalServerErrorException, Delete, Query, BadRequestException, NotAcceptableException, Param, Put } from '@nestjs/common'
import { Response, response } from 'express'
import { MeetingService } from '../services/meeting.service';
import { ObjectLiteral } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/meetings')
export class MeetingController {

    constructor(private readonly meetingService: MeetingService) { }

    @Post('new')
    public async createMeeting(@Body() body: ObjectLiteral, @Res() response: Response): Promise<Response | void> {

        const meeting = body.meeting

        if (!meeting) {
            throw new BadRequestException()
        }

        try {
            const result = await this.meetingService.createMeeting({
                ...meeting, 
                CreatedOn: new Date(), 
                EditedOn: new Date() 
            })

            // http 201: created
            if (result) {
                return response.status(201).json({ message: "Your meeting was created successfully", status: 201 })
            }

            throw new NotAcceptableException()

        }
        catch (error) {
            throw new InternalServerErrorException()
        }

    }

    @Get('')
    public async fetchAllMeetings(@Query() query: any, @Res() response: Response): Promise<Response | void> {

        const userId = query.id

        if (!userId) {
            throw new BadRequestException()
        }

        try {

            const meetings = await this.meetingService.fetchAllMeetings({ UserId: userId })

            if (meetings) {
                return response.status(200).json(meetings)
            }

            throw new NotFoundException()
        }
        catch (error) {
            throw new InternalServerErrorException()
        }
    }

    @Get('verify')
    public async verifyMeeting(@Query() query: any, @Res() response: Response): Promise<Response | void> {

        if (!query.code) {
            throw new BadRequestException()
        }

        try {
            const meeting = await this.meetingService.verifyMeeting({ Code: query.code })

            if (meeting) {
                return response.status(200).json(meeting)
            } else {
                return response.status(404).json({ message: "meeting not found", status: 404 })
            }
            
        }
        catch (error) {
            throw new InternalServerErrorException()
        }
    }

    @Put('update')
    public async updateMeeting(@Body() body: any, @Res() response: Response): Promise<void | Response> {

        const meeting = body.meeting

        if (!meeting || !meeting.MeetingId) {
            throw new BadRequestException({ message: { error: "Meeting data could not be found" }, error: { status: 400 }})
        }

        try {
            const result = await this.meetingService.updateMeeting(
                { MeetingId: meeting.MeetingId }, 
                { $set: { ...meeting, EditedOn: new Date() } }
            )

            if (result.modifiedCount) {
                return response.status(204).end()
            } else {
                return response.status(404).json({
                    message: "We could not find the meeting you are trying to update",
                    status: 404
                })
            }

        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    @Delete('delete/:meetingId')
    public async deleteMeeting(@Param() param: any, @Res() response: Response): Promise<void | Response> {

        if (!param.meetingId) {
            throw new BadRequestException()
        }

        try {
            const result = await this.meetingService.deleteMeeting({ MeetingId: param.meetingId })

            if (result.deleteCount) {
                return response.status(204).end()
            } else {
                return response.status(404).json({ 
                    message: "We could not find the meeting you are trying to delete", 
                    status: 404 
                })
            }

        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}