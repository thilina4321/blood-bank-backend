import mongoose, { Schema } from "mongoose";

// users attributes
interface EligibilityAttrs {
  title: string;
  description: string;
  items: [];
}

// describe user model to asign static methods to the modal
interface EligibilityModel extends mongoose.Model<EligibilityDoc> {
  build(attrs: EligibilityAttrs): EligibilityDoc;
}

// single documents properties
interface EligibilityDoc extends mongoose.Document {
  title: string;
  description: string;
  items: [];
}

const eligibility = new Schema(
  {
    title: String,
    description: String,
    items: [{ title: String, image: String, des: String }],
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

eligibility.statics.build = function (attrs: EligibilityAttrs) {
  return new Eligibility(attrs);
};

export const Eligibility = mongoose.model<EligibilityDoc, EligibilityModel>(
  "eligibility",
  eligibility
);
