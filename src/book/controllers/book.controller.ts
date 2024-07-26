import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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

  @Post('update/:id')
  async update(@Param('id') id: string, @Body() book: BookDto) {
    return this.bookService.update(id, book);
  }

  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }

  @Public()
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Public()
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return this.bookService.findByUserId(userId);
  }

  @Public()
  @Get('search')
  async findSearchTitleDesc(@Query('query') query: string) {
    return this.bookService.findSearchTitleDesc(query);
  }
}
