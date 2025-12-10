import { Controller, Get } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entity';

@Controller('coffee')
export class CoffeeController {
    constructor(private readonly coffeeService: CoffeeService) { }

    @Get()
    findAll(): Coffee[] {
        return this.coffeeService.findAll();
    }
}
