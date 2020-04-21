import { MongoEntityManager, getMongoManager, ObjectLiteral, getMongoRepository, MongoRepository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { IEdamamRecipe } from '../models/cookbook.model'
import { Recipe } from '@/shared/entities/recipe.entity'
import { Pantry } from '@/shared/entities/pantry.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CookbookService
{
    constructor(@InjectRepository(Recipe) private recipeRepository: MongoRepository<Recipe>) 
    {}

    public async selectRecipesByRange(min: number, limit: number): Promise<IEdamamRecipe[]> | undefined 
    {
        try {
            const recipes = await this.recipeRepository.find({ skip: min, take: 15 })
            return recipes
        } catch (error) {
            return undefined
        }
    }
}