import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Recipe } from './recipes/entities/recipe.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const recipesRepository = app.get<Repository<Recipe>>(getRepositoryToken(Recipe));

    // ... (inside bootstrap)

    const recipes = [
        {
            title: 'Espresso',
            description: 'Strong, concentrated coffee served in small shots.',
            ingredients: ['18g Finely ground coffee', 'Hot water'],
            instructions: '1. Grind coffee beans finely.\n2. Tamp the coffee grounds into the portafilter.\n3. Lock the portafilter into the espresso machine.\n4. Brew for 25-30 seconds to extract 1-2 oz of espresso.',
            imageName: 'espresso.jpg'
        },
        {
            title: 'Cappuccino',
            description: 'Equal parts espresso, steamed milk, and milk foam.',
            ingredients: ['1 shot Espresso', 'Steamed milk', 'Milk foam'],
            instructions: '1. Brew a shot of espresso.\n2. Steam milk until frothy.\n3. Pour the steamed milk over the espresso, holding back the foam with a spoon.\n4. Top with the milk foam.',
            imageName: 'cappuccino.jpg'
        },
        {
            title: 'Latte',
            description: 'Espresso with a large amount of steamed milk and a thin layer of foam.',
            ingredients: ['1 shot Espresso', 'Steamed milk', 'Thin layer of milk foam'],
            instructions: '1. Brew a shot of espresso.\n2. Steam milk to 150°F (65°C).\n3. Pour the steamed milk over the espresso, holding back the foam slightly.\n4. Top with a thin layer of foam.',
            imageName: 'latte.jpg'
        },
        {
            title: 'Mocha',
            description: 'A latte with chocolate syrup or powder added.',
            ingredients: ['1 shot Espresso', 'Steamed milk', 'Chocolate syrup', 'Whipped cream (optional)'],
            instructions: '1. Brew a shot of espresso.\n2. Stir in chocolate syrup.\n3. Add steamed milk.\n4. Top with whipped cream if desired.',
            imageName: 'mocha.jpg'
        },
        {
            title: 'Americano',
            description: 'Espresso diluted with hot water, giving it a similar strength to brewed coffee but different flavor.',
            ingredients: ['1 shot Espresso', 'Hot water'],
            instructions: '1. Brew a shot of espresso.\n2. Pour hot water (185-200°F) into a cup.\n3. Pour the espresso shot over the hot water.',
            imageName: 'americano.jpg'
        },
        {
            title: 'Macchiato',
            description: 'Espresso with a small amount of foamed milk.',
            ingredients: ['1 shot Espresso', 'Small dollop of milk foam'],
            instructions: '1. Brew a shot of espresso.\n2. Steam a small amount of milk until frothy.\n3. Spoon a dollop of foam onto the center of the espresso.',
            imageName: 'macchiato.jpg'
        },
        {
            title: 'Flat White',
            description: 'A coffee drink consisting of espresso with microfoam (steamed milk with small, fine bubbles).',
            ingredients: ['2 shots Espresso', 'Steamed milk (microfoam)'],
            instructions: '1. Brew a double shot of espresso.\n2. Steam milk to create microfoam.\n3. Pour the milk freely into the espresso to create a velvety texture.',
            imageName: 'flat-white.jpg'
        },
        {
            title: 'Affogato',
            description: 'A dessert of vanilla ice cream or gelato "drowned" with a shot of hot espresso.',
            ingredients: ['1 scoop Vanilla ice cream/gelato', '1 shot Hot espresso'],
            instructions: '1. Place a scoop of ice cream in a serving bowl or glass.\n2. Brew a shot of espresso.\n3. Pour the hot espresso over the ice cream.',
            imageName: 'affogato.jpg'
        }
    ];

    for (const recipeData of recipes) {
        const imagePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'images', recipeData.imageName);
        let imageBuffer: Buffer;
        try {
            imageBuffer = fs.readFileSync(imagePath);
        } catch (error) {
            console.error(`Failed to read image for ${recipeData.title} at ${imagePath}:`, error);
            continue;
        }

        const recipeToSave = {
            ...recipeData,
            image: imageBuffer
        };
        delete (recipeToSave as any).imageName; // remove helper prop

        const existingRecipe = await recipesRepository.findOneBy({ title: recipeData.title });
        if (existingRecipe) {
            existingRecipe.image = imageBuffer;
            // update other fields if needed
            existingRecipe.description = recipeData.description;
            existingRecipe.ingredients = recipeData.ingredients;
            existingRecipe.instructions = recipeData.instructions;
            await recipesRepository.save(existingRecipe);
            console.log(`Updated recipe: ${recipeData.title}`);
        } else {
            await recipesRepository.save(recipesRepository.create(recipeToSave));
            console.log(`Created recipe: ${recipeData.title}`);
        }
    }

    await app.close();
}

bootstrap();
