import mongoose, { Schema } from "mongoose";

// users attributes
interface UserAttrs {
  name: String;
  imageUrl: String;
  longitude: Number;
  latitude: Number;
  description: String;
}

// describe user model to asign static methods to the modal
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// single documents properties
interface UserDoc extends mongoose.Document {
  name: String;
  imageUrl: String;
  longitude: Number;
  latitude: Number;
  description: String;
}

const location = new Schema({
  name: String,
  imageUrl: String,
  longitude: Number,
  latitude: Number,
  description: String,
});

location.statics.build = function (attrs: UserAttrs) {
  return new Location(attrs);
};

export const Location = mongoose.model<UserDoc, UserModel>(
  "location",
  location
);
