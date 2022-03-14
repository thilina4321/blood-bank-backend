import mongoose, { Schema } from "mongoose";

// users attributes
interface ContactAttrs {
  title: string;
  description: string;
  email: string;
  phoneNumber: string;
  fax: string;
}

// describe user model to asign static methods to the modal
interface ContactModel extends mongoose.Model<ContactDoc> {
  build(attrs: ContactAttrs): ContactDoc;
}

// single documents properties
interface ContactDoc extends mongoose.Document {
  title: string;
  description: string;
  email: string;
  phoneNumber: string;
  fax: string;
}

const contact = new Schema(
  {
    title: String,
    description: String,
    email: String,
    phoneNumber: String,
    fax: String,
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

contact.statics.build = function (attrs: ContactAttrs) {
  return new Contact(attrs);
};

export const Contact = mongoose.model<ContactDoc, ContactModel>(
  "contact",
  contact
);
