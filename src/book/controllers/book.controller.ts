import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { BookDto } from '../dtos/book.dto';
import { JwtGuardGuard } from 'src/auth/guards/jwt-guard.guard';
import { User } from 'src/auth/schemas/user.schema';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtGuardGuard)
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post('create')
  async create(@Body() book: BookDto, @GetUser() user: User) {
    book.userId = user._id.toString();
    return this.bookService.create(book);
  }

  @Public()
  @Get()
  async findAll() {
    return this.bookService.findAll();
  }
}
