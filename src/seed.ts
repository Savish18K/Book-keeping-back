import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BookCategoriesService } from './book-categories/book-categories.service';
import { BooksService } from './books/books.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const categoriesService = app.get(BookCategoriesService);
  const booksService = app.get(BooksService);

  console.log('Seeding database...');

  // Seed categories
  const categories = await categoriesService.seed();
  console.log('Categories seeded:', categories);

  // Seed sample books
  const sampleBooks = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 12.99,
      stock: 10,
      bookCategoryId: categories.find(c => c.name === 'Fiction')?.id ?? 1,

    },
    {
      title: 'Dune',
      author: 'Frank Herbert',
      price: 15.99,
      stock: 8,
      bookCategoryId: categories.find(c => c.name === 'Science Fiction')?.id ?? 1,
    },
    {
      title: 'Steve Jobs',
      author: 'Walter Isaacson',
      price: 18.99,
      stock: 5,
      bookCategoryId: categories.find(c => c.name === 'Biography')?.id ?? 1,
    },
  ];

  for (const bookData of sampleBooks) {
    await booksService.create(bookData);
  }

  console.log('Sample books seeded');
  await app.close();
}

bootstrap().catch(console.error);