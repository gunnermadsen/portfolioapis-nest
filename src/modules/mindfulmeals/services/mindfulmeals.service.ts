import { MongoEntityManager, getMongoManager, ObjectLiteral } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { IEdamamRecipe } from '../models/cookbook.model'
import { Recipe } from '@/models/recipe.entity'

@Injectable()
export class MindfulMealsService {

    private readonly manager: MongoEntityManager = getMongoManager()

    public async fetchAllRecipes(): Promise<IEdamamRecipe[]> {
        return await this.manager.find(Recipe, )
    }

}