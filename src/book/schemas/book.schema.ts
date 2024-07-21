import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../auth/schemas/user.schema';

export type RecordDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop([String])
  images: string[];
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: User;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}
export const BookSchema = SchemaFactory.createForClass(Book);
