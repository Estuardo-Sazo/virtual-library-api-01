import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly text: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  userId: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  bookId: string;
}
