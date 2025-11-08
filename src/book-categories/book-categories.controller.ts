import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookCategoriesService } from './book-categories.service';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';

@Controller('book-categories')
export class BookCategoriesController {
  constructor(
    private readonly bookCategoriesService: BookCategoriesService,
  ) {}

  @Post()
  create(@Body() createBookCategoryDto: CreateBookCategoryDto) {
    return this.bookCategoriesService.create(createBookCategoryDto);
  }

  @Get()
  findAll() {
    return this.bookCategoriesService.findAll();
  }

  @Post('seed')
  seed() {
    return this.bookCategoriesService.seed();
  }
}
