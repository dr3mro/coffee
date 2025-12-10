import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeeService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Espresso',
            description: 'The foundation of true coffee goodness.',
            ingredients: ['Fine ground coffee', 'Hot water'],
            steps: ['Grind coffee beans fine', 'Pack into portafilter', 'Brew with high pressure water'],
        },
        {
            id: 2,
            name: 'Latte',
            description: 'A coffee drink of Italian origin made with espresso and steamed milk.',
            ingredients: ['Espresso', 'Steamed Milk', 'Milk Foam'],
            steps: ['Brew Espresso', 'Steam Milk', 'Pour milk over espresso', 'Top with foam'],
        },
        {
            id: 3,
            name: 'Cappuccino',
            description: 'A distinct espresso-based coffee drink, prepared with steamed milk foam.',
            ingredients: ['Espresso', 'Steamed Milk', 'Milk Foam'],
            steps: ['Brew Espresso', 'Steam Milk', 'Pour steamed milk', 'Add thick layer of foam'],
        },
        {
            id: 4,
            name: 'Americano',
            description: 'Espresso with added hot water.',
            ingredients: ['Espresso', 'Hot Water'],
            steps: ['Brew Espresso', 'Add hot water to taste'],
        },
        {
            id: 5,
            name: 'Mocha',
            description: 'A chocolate-flavoured warm beverage that is a variant of a caffè latte.',
            ingredients: ['Espresso', 'Chocolate Syrup', 'Steamed Milk', 'Whipped Cream'],
            steps: ['Brew Espresso', 'Add Chocolate Syrup', 'Add Steamed Milk', 'Top with Whipped Cream'],
        },
    ];

    findAll(): Coffee[] {
        return this.coffees;
    }
}
