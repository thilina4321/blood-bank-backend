import mongoose, { Schema } from "mongoose";

// users attributes
interface UserAttrs {
  question: string;
  answer: string;
}

// describe user model to asign static methods to the modal
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// single documents properties
interface UserDoc extends mongoose.Document {
  question: string;
  answer: string;
}

const faq = new Schema(
  {
    question: String,
    answer: String,
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

faq.statics.build = function (attrs: UserAttrs) {
  return new Faq(attrs);
};

export const Faq = mongoose.model<UserDoc, UserModel>("faq", faq);
