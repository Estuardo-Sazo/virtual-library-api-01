import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import { Model } from 'mongoose';
import { BookDto } from '../dtos/book.dto';
import { CommentDto } from '../dtos/comment.dto';
import { Comment } from '../schemas/comment.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Comment.name) private commetModel: Model<Comment>,
  ) {}

  async create(book: BookDto) {
    const newBook = new this.bookModel(book);
    return await newBook.save();
  }

  async update(id: string, book: BookDto) {
    return await this.bookModel.findByIdAndUpdate(id, book, { new: true });
  }

  async findAll() {
    return await this.bookModel.find().populate('userId', 'username').exec();
  }
  async delete(id: string) {
    return await this.bookModel.findByIdAndDelete(id);
  }

  async findOne(id: string) {
    return await this.bookModel
      .findById(id)
      .populate('userId', 'username')
      .exec();
  }

  async findByUserId(userId: string) {
    return await this.bookModel
      .find({ userId })
      .populate('userId', 'username')
      .exec();
  }

  async findSearchTitleDesc(query: string) {
    const regexQuery = new RegExp(query, 'i'); // 'i' para ignorar mayúsculas/minúsculas
    return await this.bookModel
      .find({
        $or: [
          { title: { $regex: regexQuery } },
          { description: { $regex: regexQuery } },
        ],
      })
      .exec();
  }

  async addComment(bookId: string, comment: CommentDto) {
    const newComment = new this.commetModel(comment);
    return newComment.save();
  }

  async findComments(bookId: string) {
    return await this.commetModel
      .find({ bookId })
      .populate('userId', 'username')
      .exec();
  }

  async deleteComment(commentId: string) {
    return await this.commetModel.findByIdAndDelete(commentId);
  }
}
