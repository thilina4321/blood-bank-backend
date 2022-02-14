import mongoose, { Schema } from "mongoose";

interface UserAttrs {
  type: String;
  amount: String;
  neededAmount: String;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  type: String;
  amount: String;
  neededAmount: String;
}

const stock = new Schema(
  {
    type: String,
    amount: String,
    neededAmount: String,
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

stock.statics.build = function (attrs: UserAttrs) {
  return new Stock(attrs);
};

export const Stock = mongoose.model<UserDoc, UserModel>("stock", stock);
