import mongoose, { Schema } from "mongoose";

const location = new Schema({
  name: String,
  imageUrl: String,
  longitude: Number,
  latitude: Number,
  description: String,
});

export const Location = mongoose.model("location", location);
