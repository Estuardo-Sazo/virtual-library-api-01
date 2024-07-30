import { Module } from '@nestjs/common';
import { BookService } from './services/book.service';
import { BookController } from './controllers/book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
