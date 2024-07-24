import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import { Model } from 'mongoose';
import { BookDto } from '../dtos/book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(book: BookDto) {
    const newBook = new this.bookModel(book);
    return await newBook.save();
  }

  async findAll() {
    return await this.bookModel.find().populate('userId', 'username').exec();
  }
}
