import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    transform: (doc, ret, game) => {
      ret._id = undefined;
    },
  },
})
class NestedXP {
  @Prop({
    default: 0,
  })
  current: number;

  @Prop({
    default: 50,
  })
  needed: number;
}

@Schema({
  toJSON: {
    transform: (doc, ret, game) => {
      ret._id = undefined;
    },
  },
})
class NestedHP {
  @Prop({
    default: 100,
  })
  current: number;

  @Prop({
    default: 100,
  })
  max: number;
}

@Schema({
  toJSON: {
    transform: (doc, ret, game) => {
      ret._id = undefined;
    },
  },
})
class NestedStats {
  @Prop({
    default: 5,
  })
  strength: number;

  @Prop({
    default: 5,
  })
  constitution: number;

  @Prop({
    default: 5,
  })
  dexterity: number;

  @Prop({
    default: 5,
  })
  intelligence: number;

  @Prop({
    default: 5,
  })
  luck: number;
}

@Schema({
  toJSON: {
    transform: (doc, ret, game) => {
      ret._id = undefined;
    },
  },
})
class NestedUserData {
  @Prop({
    default: 1,
  })
  level: number;

  @Prop({
    required: true,
  })
  hp: NestedHP;

  @Prop({
    required: true,
  })
  xp: NestedXP;

  @Prop({
    required: true,
  })
  stats: NestedStats;

  @Prop({
    default: 0,
  })
  gp: number;

  @Prop({
    default: [],
  })
  skills: string[];

  @Prop({
    default: [],
  })
  inventory: string[];

  @Prop({
    default: [],
  })
  equipement: string[];
}

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc, ret, game) => {
      ret.__v = undefined;
      ret._id = undefined;
      ret.createdAt = ret.createdAt.getTime();
    },
  },
})
export class User {
  id: any;

  @Prop({
    required: true,
  })
  createdAt: Date;

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
    default: 0,
  })
  rank_id: number;

  @Prop({
    default: 0,
  })
  rank_id: number;

  @Prop({
    required: true,
  })
  data: NestedUserData;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('full_name').get(function (this: UserDocument) {
  return `${this.username}#${this.tag}`;
});

export { UserSchema };
