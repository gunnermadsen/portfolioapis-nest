import { Controller, Get, Body, Res, UseGuards, NotFoundException, InternalServerErrorException, Delete, Query, Param, Put, Req } from '@nestjs/common'
import { Response, Request } from 'express'
import { ObjectLiteral } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { PantryService } from '../services/pantry.service';
import { CookbookService } from '../services/cookbook.service';
import { CsrfGuard } from '@/shared/guards/csrf.guard';

@Controller('api')
export class KitchenController
{
    constructor(private readonly pantryService: PantryService, private readonly cookbookService: CookbookService) 
    { }

    @UseGuards(AuthGuard('jwt'))
    @Get('cookbook')
    public async fetchAllRecipes(@Query() query: any, @Res() response: Response): Promise<Response | void>
    {
        const { min, max } = query

        if (!min || !max) throw new NotFoundException()

        try 
        {
            const cookbook = await this.cookbookService.selectRecipesByRange(parseInt(min), parseInt(max))

            return response.status(200).json({ measures: { length: cookbook.length }, cookbook: cookbook })
        } 
        catch (error) 
        {
            throw new InternalServerErrorException("An error occured", error)
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @UseGuards(CsrfGuard)
    @Get('pantry')
    public async fetchPantryItems(@Req() request: Request, @Res() response: Response, @Param() params: ObjectLiteral): Promise<Response | void>
    {
        const user = request.user

        if (!user) throw new NotFoundException()

        try
        {
            const pantry = await this.pantryService.fetchPantryItems(user)
            
            if (!pantry) throw new NotFoundException()
            
            return response.status(200).json(pantry)
        }
        catch (error)
        {
            throw new InternalServerErrorException(error)
        }
    }

    @Get('verify')
    public async verifyMeeting(@Query() query: any, @Res() response: Response): Promise<Response | void> 
    {
        
    }

    @Put('update')
    public async updateMeeting(@Body() body: any, @Res() response: Response): Promise<Response | void>
    {

    }

    @Delete('delete/:meetingId')
    public async deleteMeeting(@Param() param: any, @Res() response: Response): Promise<Response | void>
    {

    }
}