import { Controller, Get, Post, Body, Res, Request, UseGuards, HttpStatus, NotFoundException, InternalServerErrorException, Delete, Query, BadRequestException, NotAcceptableException, Param, Put } from '@nestjs/common'
import { Response, response } from 'express'
import { ObjectLiteral } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { MindfulMealsService } from '../services/mindfulmeals.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/kitchen')
export class KitchenController {

    constructor(private readonly mindfulMealsService: MindfulMealsService) { }

    @Get('cookbook')
    public async fetchAllRecipes(@Query() query: any, @Res() response: Response): Promise<Response | void> {

        const { min, max } = query

        if (!min || !max) throw new NotFoundException()

        try {
            const cookbook = await this.mindfulMealsService.fetchAllRecipes()

            return response.status(200).json(cookbook)

        } catch (error) {
            throw new InternalServerErrorException("An error occured", error)
        }
    }

    @Post('new')
    public async createMeeting(@Body() body: ObjectLiteral, @Res() response: Response): Promise<Response | void> {

    }

    @Get('verify')
    public async verifyMeeting(@Query() query: any, @Res() response: Response): Promise<Response | void> {
        
    }

    @Put('update')
    public async updateMeeting(@Body() body: any, @Res() response: Response): Promise<void | Response> {

        
    }

    @Delete('delete/:meetingId')
    public async deleteMeeting(@Param() param: any, @Res() response: Response): Promise<void | Response> {


    }
}