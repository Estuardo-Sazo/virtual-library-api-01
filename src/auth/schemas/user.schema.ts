import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RecordDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
