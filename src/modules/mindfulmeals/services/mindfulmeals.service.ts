import { MongoEntityManager, getMongoManager, ObjectLiteral, getMongoRepository, MongoRepository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { IEdamamRecipe } from '../models/cookbook.model'
import { Recipe } from '@/shared/entities/recipe.entity'
import { Pantry } from '@/shared/entities/pantry.entity'

@Injectable()
export class MindfulMealsService
{
    private readonly manager: MongoEntityManager = getMongoManager()

    public async fetchAllRecipes(): Promise<IEdamamRecipe[]>
    {
        return await this.manager.find(Recipe)
    }

    public async fetchPantryItems(user: any): Promise<any>
    {
        return await this.manager.find(Recipe)
    }

}