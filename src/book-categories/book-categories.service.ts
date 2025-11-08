import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookCategory } from './entities/book-category.entity';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';

@Injectable()
export class BookCategoriesService {
  constructor(
    @InjectRepository(BookCategory)
    private readonly bookCategoryRepository: Repository<BookCategory>,
  ) {}

  async create(createBookCategoryDto: CreateBookCategoryDto) {
    const category = this.bookCategoryRepository.create(createBookCategoryDto);
    return await this.bookCategoryRepository.save(category);
  }

  async findAll() {
    return await this.bookCategoryRepository.find();
  }

  async findOne(id: number) {
    return await this.bookCategoryRepository.findOne({ where: { id } });
  }

  async seed() {
    const categories = [
      { name: 'Fiction' },
      { name: 'Non-Fiction' },
      { name: 'Science Fiction' },
      { name: 'Biography' },
      { name: 'Technology' },
    ];

    for (const categoryData of categories) {
      const exists = await this.bookCategoryRepository.findOne({
        where: { name: categoryData.name },
      });
      if (!exists) {
        await this.bookCategoryRepository.save(
          this.bookCategoryRepository.create(categoryData),
        );
      }
    }

    return this.findAll();
  }
}
