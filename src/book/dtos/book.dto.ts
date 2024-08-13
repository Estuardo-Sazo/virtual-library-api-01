import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly images: string[];

  @IsOptional()
  @IsString()
  @ApiProperty()
  userId: string;
}
