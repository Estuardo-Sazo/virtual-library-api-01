import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  bookId: string;
}
