import { Controller, Get, Put, Post, Body, Query, Param, Delete, Patch, UsePipes, ValidationPipe } from '@nestjs/common'
import { Request, Response } from 'express'
import { NotificationsService } from '../services/notifications.service'

@Controller('api/notifications')
export class NotificationsController {

    constructor(private readonly notificationService: NotificationsService) { }

    @Get('')
    private async getNotifications(request: Request, response: Response) {

        const id = request.query.id

        if (!id) {
            return response.status(400).end()
        }

        try {

            const data = await this.notificationService.findNotifications(id)

            const result = { ...data[0].toObject() }

            return response.status(200).json(result)

        } catch (error) {

            return response.status(500).json(error)

        }
    }

    @Post('create')
    private async createNotification(request: Request, response: Response) {

        const userId = request.body.userId

        if (!userId) {
            return response.status(400).end()
        }

        try {
            const model = await this.notificationService.findNotifications(userId)

            if (!model) {
                return response.status(404).end()
            }

            const notification = {
                id: request.body.id,
                // type: request.body.notificationType,
                title: request.body.title,
                notificationType: request.body.notificationType,
                options: request.body.options,
                createdOn: new Date(),
                editedOn: new Date()
            }

            const query = {
                $push: { Notifications: notification },
                $set: { NotificationBadgeHidden: false }
            }

            const data = await this.notificationService.updateNotification({ UserId: userId }, query)

            if (data) {
                return response.status(201).json({ notifications: notification, notificationBadgeHidden: false })
            }
            else {
                return response.status(404).end()
            }

        } catch (error) {

            return response.status(500).json(error)

        }
    }

    @Delete('deleteall/:id')
    private async deleteAllNotifications(request: Request, response: Response) {

        const id = request.params.id

        if (!id) {
            return response.status(400).json()
        }

        try {
            const model = await this.notificationService.findNotification(id)

            if (!model.length) {
                return response.status(404).end()
            }

            const query = {
                $pull: {
                    Notifications: {}
                },
                $set: {
                    NotificationBadgeHidden: true
                }
            }

            const result = await this.notificationService.updateNotification({ UserId: id }, query)

            if (result.nModified >= 1) {
                return response.status(204).end()
            }
            else {
                return response.status(500).end()
            }

        } catch (error) {
            return response.status(500).end()
        }
    }

    @Put('update/:id')
    public async updateNotificationStatus(request: Request, response: Response): Promise<Response | void> {

        const id: string = request.params.id

        const notificationId = request.body.notificationId

        const status = request.body.status

        if (!id) {
            return response.status(400).end()
        }

        try {

            const state = await this.notificationService.updateNotification(
                { UserId: id, NotificationId: notificationId },
                { $set: { status: status } }
            )

            if (state.ok === 1) {
                return response.status(204).end()
            }
            else {
                return response.status(500).end()
            }

        }
        catch (error) {
            return response.status(500).end()
        }
    }

    @Put(':id')
    public async setNotificationBadgeState(request: Request, response: Response): Promise<Response | void> {

        const id: string = request.params.id

        const viewState = request.body.state

        if (!id) {
            return response.status(400).end()
        }

        try {
            const model = await this.notificationService.findNotifications(id)

            if (!model) {
                return response.status(404).end()
            }

            const state = await this.notificationService.updateNotification(
                { UserId: id },
                { $set: { NotificationBadgeHidden: viewState } }
            )

            if (state.ok === 1) {
                return response.status(204).end()
            }
            else {
                return response.status(500).end()
            }

        } catch (error) {

            return response.status(500).end()

        }

    }

}