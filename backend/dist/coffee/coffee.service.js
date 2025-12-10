"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeService = void 0;
const common_1 = require("@nestjs/common");
let CoffeeService = class CoffeeService {
    coffees = [
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
    findAll() {
        return this.coffees;
    }
};
exports.CoffeeService = CoffeeService;
exports.CoffeeService = CoffeeService = __decorate([
    (0, common_1.Injectable)()
], CoffeeService);
//# sourceMappingURL=coffee.service.js.map