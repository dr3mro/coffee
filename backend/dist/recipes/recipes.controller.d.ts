import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    create(createRecipeDto: CreateRecipeDto): Promise<import("./entities/recipe.entity").Recipe>;
    findAll(): Promise<import("./entities/recipe.entity").Recipe[]>;
    findOne(id: string): Promise<import("./entities/recipe.entity").Recipe | null>;
    update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
