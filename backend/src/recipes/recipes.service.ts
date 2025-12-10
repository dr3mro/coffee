import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
  ) { }

  create(createRecipeDto: CreateRecipeDto, imageBuffer?: Buffer) {
    const recipe = this.recipesRepository.create({
      ...createRecipeDto,
      image: imageBuffer,
    });
    return this.recipesRepository.save(recipe);
  }

  findAll() {
    return this.recipesRepository.find();
  }

  findOne(id: string) {
    return this.recipesRepository.findOneBy({ id });
  }

  async findImage(id: string): Promise<Buffer | null> {
    const recipe = await this.recipesRepository.findOne({
      where: { id },
      select: ['image'],
    });
    return (recipe?.image && recipe.image.length > 0) ? recipe.image : null;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto, imageBuffer?: Buffer) {
    const recipe = await this.recipesRepository.findOneBy({ id });
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    const updatedRecipe = {
      ...recipe,
      ...updateRecipeDto,
      image: imageBuffer || recipe.image,
    };
    return this.recipesRepository.save(updatedRecipe);
  }

  remove(id: string) {
    return this.recipesRepository.delete(id);
  }
}
