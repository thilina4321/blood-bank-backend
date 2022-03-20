import mongoose, { Schema } from "mongoose";

interface FooterAttrs {
  title: string;
  url: string;
}

interface FooterModel extends mongoose.Model<FooterDoc> {
  build(attrs: FooterAttrs): FooterDoc;
}

interface FooterDoc extends mongoose.Document {
    title: string;
    url: string;
}

const fotter = new Schema(
  {
    title: String,
    url: String,
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

fotter.statics.build = function (attrs: FooterAttrs) {
  return new Fotter(attrs);
};

export const Fotter = mongoose.model<FooterDoc, FooterModel>(
  "fotter",
  fotter
);
