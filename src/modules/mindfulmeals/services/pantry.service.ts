import { MongoEntityManager, getMongoManager, ObjectLiteral, getMongoRepository, MongoRepository, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { IEdamamRecipe } from '../models/cookbook.model'
import { Recipe } from '@/shared/entities/recipe.entity'
import { Pantry } from '@/shared/entities/pantry.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PantryService
{
    constructor(@InjectRepository(Pantry) private pantryRepository: Repository<Pantry>) 
    {}

    public async fetchPantryItems(user: any): Promise<any>
    {
        return await this.pantryRepository.find({ UserId: user.sub })
    }

}