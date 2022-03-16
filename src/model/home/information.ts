import mongoose, { Schema } from "mongoose";

interface InformationAttrs {
  title: string;
  description: string;
  imageUrl: string;
}

interface InformationModel extends mongoose.Model<InformationDoc> {
  build(attrs: InformationAttrs): InformationDoc;
}

interface InformationDoc extends mongoose.Document {
  title: string;
  description: string;
  imageUrl:string
}

const homeInformation = new Schema(
  {
    title: String,
    description: String,
    imageUrl:String
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

homeInformation.statics.build = function (attrs: InformationAttrs) {
  return new Information(attrs);
};

export const Information = mongoose.model<InformationDoc, InformationModel>(
  "home-information",
  homeInformation
);
