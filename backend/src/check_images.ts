import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Recipe } from './recipes/entities/recipe.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const recipesRepository = app.get<Repository<Recipe>>(getRepositoryToken(Recipe));

    const recipes = await recipesRepository.find({
        select: ['id', 'title', 'image'], // Explicitly select image which is select: false by default
    });

    console.log(`Found ${recipes.length} recipes.`);
    for (const recipe of recipes) {
        const start = recipe.image ? recipe.image.toString('hex').substring(0, 20) : 'null';
        const length = recipe.image ? recipe.image.length : 0;
        console.log(`Recipe: ${recipe.title}, Image Length: ${length} bytes, Start: ${start}...`);
    }

    await app.close();
}

bootstrap();
