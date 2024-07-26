import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsArray()
  readonly images: string[];

  @IsOptional()
  @IsString()
  userId: string;
}
