import mongoose, { Schema } from "mongoose";

interface DonateBloodAttrs {
  title: string;
  description: string;
  items: [];
}

interface DonateBloodModel extends mongoose.Model<DonateBloodDoc> {
  build(attrs: DonateBloodAttrs): DonateBloodDoc;
}

interface DonateBloodDoc extends mongoose.Document {
  title: string;
  description: string;
  items: [];
}

const donateBlood = new Schema(
  {
    title: String,
    description: String,
    items: [{ title: String }],
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

donateBlood.statics.build = function (attrs: DonateBloodAttrs) {
  return new DonateBlood(attrs);
};

export const DonateBlood = mongoose.model<DonateBloodDoc, DonateBloodModel>(
  "donate-blood",
  donateBlood
);
