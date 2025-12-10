import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createRecipeDto: CreateRecipeDto, @UploadedFile() file: Express.Multer.File) {
    return this.recipesService.create(createRecipeDto, file ? file.buffer : undefined);
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Get(':id/image')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    const image = await this.recipesService.findImage(id);
    if (!image) {
      return res.status(404).send('Image not found');
    }
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(image);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto, @UploadedFile() file: Express.Multer.File) {
    return this.recipesService.update(id, updateRecipeDto, file ? file.buffer : undefined);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }
}
