import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class User {
  @Prop({
    unique: true,
    match:
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
    required: true,
  })
  email: string;

  @Prop({
    minlength: 4,
    maxlength: 16,
    match: /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g,
    required: true,
  })
  username: string;

  @Prop({
    length: 4,
    required: true,
  })
  tag: number;

  full_name: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default: [],
  })
  tags: string[];

  @Prop({
    required: true,
  })
  createdAt: Date;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('full_name').get(function (this: UserDocument) {
  return `${this.username}#${this.tag}`;
});

export { UserSchema };
