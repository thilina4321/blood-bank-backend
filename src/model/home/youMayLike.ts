import mongoose, { Schema } from "mongoose";

interface YouMayLikeAttrs {
  title: string;
  items: { title: string; description: string; imageUrl: string }[];
  imageUrl: string;
}

interface YouMayLikeModel extends mongoose.Model<YouMayLikeDoc> {
  build(attrs: YouMayLikeAttrs): YouMayLikeDoc;
}

interface YouMayLikeDoc extends mongoose.Document {
  title: string;
  items: { title: string; description: string; imageUrl: string }[];
  imageUrl: string;
}

const youMayLike = new Schema(
  {
    title: String,
    items: [{ title: String, description: String, imageUrl: String }],
    imageUrl: String,
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

youMayLike.statics.build = function (attrs: YouMayLikeAttrs) {
  return new YouMayLike(attrs);
};

export const YouMayLike = mongoose.model<YouMayLikeDoc, YouMayLikeModel>(
  "you-may-like",
  youMayLike
);
