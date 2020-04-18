import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { IEdamamRecipe, IDigest, ITotalNutrients } from '@/modules/mindfulmeals/models/cookbook.model';

@Entity({ name: 'recipes' })
export class Recipe implements IEdamamRecipe
{
    @ObjectIdColumn()
    public _id: ObjectID

    @Column()
    public calories: any;

    @Column()
    public cautions: any;

    @Column()
    public dietLabels: any;

    @Column()
    public healthLabels: any;

    @Column()
    public image: string;

    @Column()
    public ingredientLines: any;

    @Column()
    public ingredients: any;

    @Column()
    public label: any;

    @Column()
    public shareAs: any;

    @Column()
    public source: any;

    @Column()
    public totalDaily: ITotalNutrients;

    @Column()
    public totalNutrients: ITotalNutrients;

    @Column()
    public totalWeight: number;

    @Column()
    public url: string;

    @Column()
    public digest: IDigest;


}