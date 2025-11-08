import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class BookQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  categoryId?: number;
}