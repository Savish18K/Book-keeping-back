import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBookCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}