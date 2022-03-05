import mongoose, { Schema } from "mongoose";

interface NoteAttrs {
  name: String;
  note: String;
  position: String;
}

interface UserModel extends mongoose.Model<NoteDoc> {
  build(attrs: NoteAttrs): NoteDoc;
}

interface NoteDoc extends mongoose.Document {
  name: String;
  note: String;
  position: String;
}

const notes = new Schema(
  {
    name: String,
    note: String,
    position: String,
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

notes.statics.build = function (attrs: NoteAttrs) {
  return new DoctorNote(attrs);
};

export const DoctorNote = mongoose.model<NoteDoc, UserModel>("doctor-notes", notes);
