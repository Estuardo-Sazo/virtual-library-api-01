import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { BookDto } from '../dtos/book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post('create')
  async create(@Body() book: BookDto) {
    return this.bookService.create(book);
  }

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }
}
