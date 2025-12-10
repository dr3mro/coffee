import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entity';
export declare class CoffeeController {
    private readonly coffeeService;
    constructor(coffeeService: CoffeeService);
    findAll(): Coffee[];
}
