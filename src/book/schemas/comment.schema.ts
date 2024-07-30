import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../auth/schemas/user.schema';
import { Book } from './book.schema';

@Schema({ timestamps: true })
export class Comment {
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  text: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: User;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Book' })
  bookId: Book;
  @Prop()
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
