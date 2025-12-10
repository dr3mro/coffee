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

    const imagesDir = path.join(__dirname, '..', '..', 'frontend', 'public', 'images');
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    const recipesToRestore = [
        { title: 'Espresso', url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', filename: 'espresso.jpg' },
        { title: 'Cappuccino', url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', filename: 'cappuccino.jpg' },
        { title: 'Latte', url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', filename: 'latte.jpg' },
        { title: 'Mocha', url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', filename: 'mocha.jpg' },
        { title: 'Americano', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', filename: 'americano.jpg' },
        { title: 'Macchiato', url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', filename: 'macchiato.jpg' },
        { title: 'Flat White', url: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', filename: 'flat-white.jpg' },
        { title: 'Affogato', url: 'https://images.unsplash.com/photo-1599398054066-846f28917f38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', filename: 'affogato.jpg' },
    ];

    for (const item of recipesToRestore) {
        const filePath = path.join(imagesDir, item.filename);
        console.log(`Downloading ${item.title} image...`);

        try {
            const response = await fetch(item.url);
            if (!response.ok) throw new Error(`Failed to fetch ${item.url}: ${response.statusText}`);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            fs.writeFileSync(filePath, buffer);
            console.log(`Saved ${item.filename}`);

            const recipe = await recipesRepository.findOneBy({ title: item.title });
            if (recipe) {
                recipe.image = buffer;
                await recipesRepository.save(recipe);
                console.log(`Updated DB for ${item.title}`);
            } else {
                console.log(`Recipe ${item.title} not found in DB, skipping update.`);
            }
        } catch (error) {
            console.error(`Error working on ${item.title}:`, error);
        }
    }

    await app.close();
}

bootstrap();
