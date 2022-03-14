import mongoose, { Schema } from "mongoose";

// users attributes
interface QueryAttrs {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

// describe user model to asign static methods to the modal
interface QueryModel extends mongoose.Model<QueryDoc> {
  build(attrs: QueryAttrs): QueryDoc;
}

// single documents properties
interface QueryDoc extends mongoose.Document {
    fullName: string;
    email: string;
    phoneNumber: string;
    message: string;
}

const query = new Schema(
  {
    fullName: String,
    message: String,
    email: String,
    phoneNumber: String,
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

query.statics.build = function (attrs: QueryAttrs) {
  return new Query(attrs);
};

export const Query = mongoose.model<QueryDoc, QueryModel>(
  "query",
  query
);
